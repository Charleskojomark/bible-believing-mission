import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import db, { initDb } from "@/lib/db";

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await initDb();
    const { rows } = await db.execute(`SELECT * FROM events ORDER BY date DESC`);
    return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await initDb();

    const form = await req.formData();
    const title = form.get("title") as string;
    const date = form.get("date") as string;
    const time = (form.get("time") as string) || "";
    const location = form.get("location") as string;
    const description = form.get("description") as string;
    const flyer = form.get("flyer") as File | null;

    let flyer_url = "", flyer_key = "";
    if (flyer) {
        flyer_key = `bbm/events/flyer-${Date.now()}.${flyer.name.split(".").pop()}`;
        flyer_url = await uploadToR2(flyer_key, Buffer.from(await flyer.arrayBuffer()), flyer.type);
    }

    await db.execute({
        sql: `INSERT INTO events (title, date, time, location, flyer_url, flyer_key, description) VALUES (?,?,?,?,?,?,?)`,
        args: [title, date, time, location, flyer_url, flyer_key, description],
    });

    return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await initDb();

    const form = await req.formData();
    const id = form.get("id") as string;
    const title = form.get("title") as string;
    const date = form.get("date") as string;
    const time = (form.get("time") as string) || "";
    const location = form.get("location") as string;
    const description = form.get("description") as string;
    const flyer = form.get("flyer") as File | null;

    if (flyer) {
        // Upload new flyer
        const flyer_key = `bbm/events/flyer-${Date.now()}.${flyer.name.split(".").pop()}`;
        const flyer_url = await uploadToR2(flyer_key, Buffer.from(await flyer.arrayBuffer()), flyer.type);

        // Delete old flyer
        const { rows } = await db.execute({ sql: `SELECT flyer_key FROM events WHERE id = ?`, args: [id] });
        if (rows[0]?.flyer_key) await deleteFromR2(rows[0].flyer_key as string);

        // Update with new flyer
        await db.execute({
            sql: `UPDATE events SET title=?, date=?, time=?, location=?, flyer_url=?, flyer_key=?, description=? WHERE id=?`,
            args: [title, date, time, location, flyer_url, flyer_key, description, id],
        });
    } else {
        // Update without changing flyer
        await db.execute({
            sql: `UPDATE events SET title=?, date=?, time=?, location=?, description=? WHERE id=?`,
            args: [title, date, time, location, description, id],
        });
    }

    return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    const { rows } = await db.execute({ sql: `SELECT flyer_key FROM events WHERE id = ?`, args: [id] });
    if (rows[0]?.flyer_key) await deleteFromR2(rows[0].flyer_key as string);
    await db.execute({ sql: `DELETE FROM events WHERE id = ?`, args: [id] });
    return NextResponse.json({ ok: true });
}
