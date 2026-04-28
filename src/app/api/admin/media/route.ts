import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteFromR2 } from "@/lib/r2";
import db, { initDb } from "@/lib/db";

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await initDb();
    const { rows } = await db.execute(`SELECT * FROM media ORDER BY created_at DESC`);
    return NextResponse.json(rows);
}

export async function DELETE(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    const { rows } = await db.execute({ sql: `SELECT r2_key FROM media WHERE id = ?`, args: [id] });
    if (rows[0]?.r2_key) await deleteFromR2(rows[0].r2_key as string);
    await db.execute({ sql: `DELETE FROM media WHERE id = ?`, args: [id] });
    return NextResponse.json({ ok: true });
}
