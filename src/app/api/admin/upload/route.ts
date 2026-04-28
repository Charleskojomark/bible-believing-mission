import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadToR2 } from "@/lib/r2";
import db, { initDb } from "@/lib/db";

export async function POST(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await initDb();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const type = formData.get("type") as string | null; // image | audio | video | document

    if (!file || !title || !type) {
        return NextResponse.json({ error: "Missing file, title, or type" }, { status: 400 });
    }

    const ext = file.name.split(".").pop();
    const key = `bbm/${type}s/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadToR2(key, buffer, file.type);

    await db.execute({
        sql: `INSERT INTO media (title, type, url, r2_key, size) VALUES (?, ?, ?, ?, ?)`,
        args: [title, type, url, key, file.size],
    });

    return NextResponse.json({ ok: true, url });
}
