import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadToR2, deleteFromR2 } from "@/lib/r2";
import db, { initDb } from "@/lib/db";

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await initDb();
    const { rows } = await db.execute(`SELECT * FROM sermons ORDER BY date DESC`);
    return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await initDb();

    const form = await req.formData();
    const title = form.get("title") as string;
    const preacher = form.get("preacher") as string;
    const date = form.get("date") as string;
    const description = form.get("description") as string;
    const audio = form.get("audio") as File | null;
    const thumbnail = form.get("thumbnail") as File | null;

    let audio_url = "", audio_key = "";
    let thumbnail_url = "", thumbnail_key = "";

    if (audio) {
        audio_key = `bbm/sermons/audio-${Date.now()}.${audio.name.split(".").pop()}`;
        audio_url = await uploadToR2(audio_key, Buffer.from(await audio.arrayBuffer()), audio.type);
    }
    if (thumbnail) {
        thumbnail_key = `bbm/sermons/thumb-${Date.now()}.${thumbnail.name.split(".").pop()}`;
        thumbnail_url = await uploadToR2(thumbnail_key, Buffer.from(await thumbnail.arrayBuffer()), thumbnail.type);
    }

    await db.execute({
        sql: `INSERT INTO sermons (title, preacher, date, audio_url, audio_key, thumbnail_url, thumbnail_key, description) VALUES (?,?,?,?,?,?,?,?)`,
        args: [title, preacher, date, audio_url, audio_key, thumbnail_url, thumbnail_key, description],
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
    const preacher = form.get("preacher") as string;
    const date = form.get("date") as string;
    const description = form.get("description") as string;
    const audio = form.get("audio") as File | null;
    const thumbnail = form.get("thumbnail") as File | null;

    let setFields = ["title=?", "preacher=?", "date=?", "description=?"];
    let args: any[] = [title, preacher, date, description];

    if (audio) {
        const audio_key = `bbm/sermons/audio-${Date.now()}.${audio.name.split(".").pop()}`;
        const audio_url = await uploadToR2(audio_key, Buffer.from(await audio.arrayBuffer()), audio.type);
        setFields.push("audio_url=?", "audio_key=?");
        args.push(audio_url, audio_key);

        const { rows } = await db.execute({ sql: `SELECT audio_key FROM sermons WHERE id = ?`, args: [id] });
        if (rows[0]?.audio_key) await deleteFromR2(rows[0].audio_key as string);
    }

    if (thumbnail) {
        const thumbnail_key = `bbm/sermons/thumb-${Date.now()}.${thumbnail.name.split(".").pop()}`;
        const thumbnail_url = await uploadToR2(thumbnail_key, Buffer.from(await thumbnail.arrayBuffer()), thumbnail.type);
        setFields.push("thumbnail_url=?", "thumbnail_key=?");
        args.push(thumbnail_url, thumbnail_key);

        const { rows } = await db.execute({ sql: `SELECT thumbnail_key FROM sermons WHERE id = ?`, args: [id] });
        if (rows[0]?.thumbnail_key) await deleteFromR2(rows[0].thumbnail_key as string);
    }

    args.push(id); // for the WHERE clause

    await db.execute({
        sql: `UPDATE sermons SET ${setFields.join(", ")} WHERE id=?`,
        args: args,
    });

    return NextResponse.json({ ok: true });
}


export async function DELETE(req: NextRequest) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    const { rows } = await db.execute({ sql: `SELECT audio_key, thumbnail_key FROM sermons WHERE id = ?`, args: [id] });
    if (rows[0]?.audio_key) await deleteFromR2(rows[0].audio_key as string);
    if (rows[0]?.thumbnail_key) await deleteFromR2(rows[0].thumbnail_key as string);
    await db.execute({ sql: `DELETE FROM sermons WHERE id = ?`, args: [id] });
    return NextResponse.json({ ok: true });
}
