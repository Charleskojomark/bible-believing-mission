"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    FiUploadCloud, FiImage, FiMusic, FiVideo, FiFileText,
    FiTrash2, FiLogOut, FiCalendar, FiBook, FiGrid, FiPlus, FiX
} from "react-icons/fi";

// ─── Types ──────────────────────────────────────────────────────────────────
type Tab = "upload" | "media" | "sermons" | "events";
type MediaItem = { id: number; title: string; type: string; url: string; size: number; created_at: string };
type Sermon = { id: number; title: string; preacher: string; date: string; audio_url: string; thumbnail_url: string; description: string };
type Event = { id: number; title: string; date: string; location: string; flyer_url: string; description: string };

const TYPE_ICONS: Record<string, React.ReactNode> = {
    image: <FiImage />, audio: <FiMusic />, video: <FiVideo />, document: <FiFileText />
};

function formatSize(bytes: number) {
    if (bytes === 0) return "—";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ tab, setTab, onLogout }: { tab: Tab; setTab: (t: Tab) => void; onLogout: () => void }) {
    const items: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "upload", label: "Upload", icon: <FiUploadCloud size={18} /> },
        { id: "media", label: "Media Library", icon: <FiGrid size={18} /> },
        { id: "sermons", label: "Sermons", icon: <FiBook size={18} /> },
        { id: "events", label: "Events & Flyers", icon: <FiCalendar size={18} /> },
    ];
    return (
        <aside className="w-60 flex-shrink-0 bg-[#1e1035] h-full flex flex-col">
            {/* Brand */}
            <div className="px-6 py-6 flex items-center gap-3 border-b border-white/10">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-400">
                    <Image src="/talknado_logo.jpeg" alt="Logo" fill className="object-cover" />
                </div>
                <div className="leading-tight">
                    <p className="text-white font-bold text-xs uppercase tracking-wide">BBM</p>
                    <p className="text-purple-300 text-[10px]">Content Manager</p>
                </div>
            </div>
            {/* Nav */}
            <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
                {items.map(({ id, label, icon }) => (
                    <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full text-left ${tab === id ? "bg-purple-600 text-white" : "text-purple-200 hover:bg-white/10"
                            }`}
                    >
                        {icon} {label}
                    </button>
                ))}
            </nav>
            <button
                onClick={onLogout}
                className="flex items-center gap-3 mx-3 mb-6 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/20 rounded-xl transition-all w-[calc(100%-1.5rem)]"
            >
                <FiLogOut size={16} /> Log Out
            </button>
        </aside>
    );
}

// ─── Upload Tab ─────────────────────────────────────────────────────────────
function UploadTab() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("image");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const dropRef = useRef<HTMLDivElement>(null);

    const handleFile = (f: File) => {
        setFile(f);
        if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
        // Auto-detect type
        if (f.type.startsWith("image/")) setType("image");
        else if (f.type.startsWith("audio/")) setType("audio");
        else if (f.type.startsWith("video/")) setType("video");
        else setType("document");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true); setMsg(null);
        const fd = new FormData();
        fd.append("file", file); fd.append("title", title); fd.append("type", type);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        setLoading(false);
        if (res.ok) { setMsg({ ok: true, text: "Uploaded successfully!" }); setFile(null); setTitle(""); }
        else { const d = await res.json(); setMsg({ ok: false, text: d.error || "Upload failed" }); }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Upload File</h2>
            <form onSubmit={submit} className="flex flex-col gap-5">
                {/* Drop zone */}
                <div
                    ref={dropRef}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); }}
                    onClick={() => document.getElementById("file-input")?.click()}
                    className="border-2 border-dashed border-purple-300 rounded-2xl p-10 text-center cursor-pointer hover:bg-purple-50 transition-colors"
                >
                    <input id="file-input" type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                    <FiUploadCloud size={40} className="mx-auto text-purple-400 mb-3" />
                    {file ? (
                        <div className="flex items-center justify-center gap-2">
                            <span className="font-semibold text-gray-800 truncate max-w-xs">{file.name}</span>
                            <span className="text-gray-400 text-sm">({formatSize(file.size)})</span>
                            <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-red-400 hover:text-red-600"><FiX /></button>
                        </div>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-700">Drag & drop or click to select</p>
                            <p className="text-gray-400 text-sm mt-1">Images, audio, video, PDF — any file type</p>
                        </>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Give this file a name" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                        <option value="image">Image</option>
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="document">Document / PDF</option>
                    </select>
                </div>

                {msg && (
                    <div className={`px-4 py-3 rounded-lg text-sm font-semibold ${msg.ok ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {msg.text}
                    </div>
                )}

                <button disabled={loading || !file} type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
                >
                    {loading ? "Uploading…" : "Upload File"}
                </button>
            </form>
        </div>
    );
}

// ─── Media Library Tab ───────────────────────────────────────────────────────
function MediaTab() {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    const load = async () => { setLoading(true); const r = await fetch("/api/admin/media"); setItems(await r.json()); setLoading(false); };
    useEffect(() => { load(); }, []);

    const del = async (id: number) => {
        if (!confirm("Delete this file? This cannot be undone.")) return;
        setDeleting(id);
        await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        setDeleting(null); load();
    };

    if (loading) return <div className="text-center py-20 text-gray-400">Loading media…</div>;

    return (
        <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Media Library <span className="text-gray-400 font-normal text-base">({items.length} files)</span></h2>
            {items.length === 0 ? <p className="text-gray-400 py-20 text-center">No files uploaded yet.</p> : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative">
                            {item.type === "image" ? (
                                <div className="relative w-full aspect-square bg-gray-50">
                                    <Image src={item.url} alt={item.title} fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="w-full aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center justify-center gap-2">
                                    <span className="text-3xl text-purple-500">{TYPE_ICONS[item.type]}</span>
                                    <span className="text-xs text-purple-400 uppercase font-bold">{item.type}</span>
                                </div>
                            )}
                            <div className="p-2">
                                <p className="text-xs font-semibold text-gray-700 truncate">{item.title}</p>
                                <p className="text-[10px] text-gray-400">{formatSize(item.size)}</p>
                            </div>
                            <button onClick={() => del(item.id)} disabled={deleting === item.id}
                                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            >
                                <FiTrash2 size={13} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Sermons Tab ─────────────────────────────────────────────────────────────
function SermonsTab() {
    const [sermons, setSermons] = useState<Sermon[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [form, setForm] = useState({ title: "", preacher: "", date: "", description: "" });
    const [audio, setAudio] = useState<File | null>(null);
    const [thumb, setThumb] = useState<File | null>(null);

    const load = async () => { setLoading(true); const r = await fetch("/api/admin/sermons"); setSermons(await r.json()); setLoading(false); };
    useEffect(() => { load(); }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (audio) fd.append("audio", audio);
        if (thumb) fd.append("thumbnail", thumb);
        const res = await fetch("/api/admin/sermons", { method: "POST", body: fd });
        setSaving(false);
        if (res.ok) { setShowForm(false); setForm({ title: "", preacher: "", date: "", description: "" }); setAudio(null); setThumb(null); load(); }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this sermon?")) return;
        setDeleting(id);
        await fetch("/api/admin/sermons", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        setDeleting(null); load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-gray-900">Sermons</h2>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-purple-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-purple-700 transition">
                    <FiPlus /> Add Sermon
                </button>
            </div>

            {showForm && (
                <form onSubmit={save} className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Sermon Title *</label>
                        <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Preacher *</label>
                        <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.preacher} onChange={(e) => setForm({ ...form, preacher: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Date *</label>
                        <input type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Audio File (MP3 / WAV)</label>
                        <input type="file" accept="audio/*" className="w-full text-sm" onChange={(e) => setAudio(e.target.files?.[0] || null)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Thumbnail Image</label>
                        <input type="file" accept="image/*" className="w-full text-sm" onChange={(e) => setThumb(e.target.files?.[0] || null)} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                        <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                        <button type="submit" disabled={saving} className="bg-purple-600 text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-purple-700 transition disabled:opacity-50">{saving ? "Saving…" : "Save Sermon"}</button>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 text-sm font-semibold">Cancel</button>
                    </div>
                </form>
            )}

            {loading ? <p className="text-center py-12 text-gray-400">Loading…</p> : (
                <div className="flex flex-col gap-3">
                    {sermons.length === 0 ? <p className="text-gray-400 py-12 text-center">No sermons yet.</p> : sermons.map((s) => (
                        <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm">
                            {s.thumbnail_url ? (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image src={s.thumbnail_url} alt={s.title} fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-500"><FiMusic size={24} /></div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 text-sm truncate">{s.title}</p>
                                <p className="text-gray-500 text-xs">{s.preacher} · {s.date}</p>
                                {s.audio_url && <audio controls src={s.audio_url} className="mt-2 w-full h-8" />}
                            </div>
                            <button onClick={() => del(s.id)} disabled={deleting === s.id} className="text-red-400 hover:text-red-600 flex-shrink-0"><FiTrash2 /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Events Tab ───────────────────────────────────────────────────────────────
function EventsTab() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [form, setForm] = useState({ title: "", date: "", location: "", description: "" });
    const [flyer, setFlyer] = useState<File | null>(null);

    const load = async () => { setLoading(true); const r = await fetch("/api/admin/events"); setEvents(await r.json()); setLoading(false); };
    useEffect(() => { load(); }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (flyer) fd.append("flyer", flyer);
        const res = await fetch("/api/admin/events", { method: "POST", body: fd });
        setSaving(false);
        if (res.ok) { setShowForm(false); setForm({ title: "", date: "", location: "", description: "" }); setFlyer(null); load(); }
    };

    const del = async (id: number) => {
        if (!confirm("Delete this event?")) return;
        setDeleting(id);
        await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        setDeleting(null); load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-gray-900">Events &amp; Flyers</h2>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-purple-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-purple-700 transition">
                    <FiPlus /> Add Event
                </button>
            </div>

            {showForm && (
                <form onSubmit={save} className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Event Title *</label>
                        <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Date *</label>
                        <input type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Location</label>
                        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Flyer Image</label>
                        <input type="file" accept="image/*" className="w-full text-sm" onChange={(e) => setFlyer(e.target.files?.[0] || null)} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                        <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="sm:col-span-2 flex gap-3">
                        <button type="submit" disabled={saving} className="bg-purple-600 text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-purple-700 transition disabled:opacity-50">{saving ? "Saving…" : "Save Event"}</button>
                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 text-sm font-semibold">Cancel</button>
                    </div>
                </form>
            )}

            {loading ? <p className="text-center py-12 text-gray-400">Loading…</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.length === 0 ? <p className="text-gray-400 py-12 text-center sm:col-span-3">No events yet.</p> : events.map((ev) => (
                        <div key={ev.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group relative">
                            {ev.flyer_url ? (
                                <div className="relative w-full aspect-[3/4] bg-gray-100">
                                    <Image src={ev.flyer_url} alt={ev.title} fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="w-full aspect-[3/4] bg-purple-100 flex items-center justify-center text-purple-400"><FiCalendar size={40} /></div>
                            )}
                            <div className="p-3">
                                <p className="font-bold text-gray-900 text-sm">{ev.title}</p>
                                <p className="text-gray-500 text-xs">{ev.date} {ev.location && `· ${ev.location}`}</p>
                            </div>
                            <button onClick={() => del(ev.id)} disabled={deleting === ev.id}
                                className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs"
                            ><FiTrash2 size={13} /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
    const [tab, setTab] = useState<Tab>("upload");

    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar tab={tab} setTab={setTab} onLogout={logout} />
            <main className="flex-1 overflow-y-auto p-8">
                {tab === "upload" && <UploadTab />}
                {tab === "media" && <MediaTab />}
                {tab === "sermons" && <SermonsTab />}
                {tab === "events" && <EventsTab />}
            </main>
        </div>
    );
}
