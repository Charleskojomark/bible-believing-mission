"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
    FiUploadCloud, FiImage, FiMusic, FiVideo, FiFileText,
    FiTrash2, FiEdit2, FiLogOut, FiCalendar, FiBook, FiGrid, FiPlus, FiX, FiMenu
} from "react-icons/fi";

// ─── Types ──────────────────────────────────────────────────────────────────
type Tab = "upload" | "media" | "sermons" | "events";
type MediaItem = { id: number; title: string; type: string; url: string; size: number; created_at: string };
type Sermon = { id: number; title: string; preacher: string; date: string; audio_url: string; thumbnail_url: string };
type Event = { id: number; title: string; date: string; time: string; location: string; flyer_url: string };

const TYPE_ICONS: Record<string, React.ReactNode> = {
    image: <FiImage />, audio: <FiMusic />, video: <FiVideo />, document: <FiFileText />
};

function formatSize(bytes: number) {
    if (!bytes) return "—";
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "upload", label: "Upload", icon: <FiUploadCloud size={20} /> },
    { id: "media", label: "Media", icon: <FiGrid size={20} /> },
    { id: "sermons", label: "Sermons", icon: <FiBook size={20} /> },
    { id: "events", label: "Events", icon: <FiCalendar size={20} /> },
];

// ─── Upload Tab ─────────────────────────────────────────────────────────────
function UploadTab() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("image");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

    const handleFile = (f: File) => {
        setFile(f);
        if (!title) setTitle(f.name.replace(/\.[^.]+$/, ""));
        if (f.type.startsWith("image/")) setType("image");
        else if (f.type.startsWith("audio/")) setType("audio");
        else if (f.type.startsWith("video/")) setType("video");
        else setType("document");
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
        <div className="max-w-lg mx-auto w-full">
            <h2 className="text-lg font-extrabold text-gray-900 mb-5">Upload File</h2>
            <form onSubmit={submit} className="flex flex-col gap-4">
                {/* Drop zone */}
                <label
                    className="border-2 border-dashed border-purple-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-purple-50 transition-colors block"
                >
                    <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                    <FiUploadCloud size={36} className="mx-auto text-purple-400 mb-2" />
                    {file ? (
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <span className="font-semibold text-gray-800 truncate max-w-[200px] text-sm">{file.name}</span>
                            <span className="text-gray-400 text-xs">({formatSize(file.size)})</span>
                            <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-red-400 hover:text-red-600"><FiX size={14} /></button>
                        </div>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-700 text-sm">Tap to select a file</p>
                            <p className="text-gray-400 text-xs mt-1">Images, audio, video, PDF — any type</p>
                        </>
                    )}
                </label>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Title *</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Give this file a name" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
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
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 text-sm"
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

    const load = async () => { setLoading(true); const r = await fetch("/api/admin/media"); setItems(await r.json()); setLoading(false); };
    useEffect(() => { load(); }, []);

    const del = async (id: number) => {
        if (!confirm("Delete this file?")) return;
        await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        load();
    };

    if (loading) return <div className="text-center py-16 text-gray-400 text-sm">Loading media…</div>;

    return (
        <div>
            <h2 className="text-lg font-extrabold text-gray-900 mb-4">Media Library <span className="text-gray-400 font-normal text-sm">({items.length} files)</span></h2>
            {items.length === 0 ? <p className="text-gray-400 py-16 text-center text-sm">No files uploaded yet.</p> : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group relative">
                            {item.type === "image" ? (
                                <div className="relative w-full aspect-square bg-gray-50">
                                    <Image src={item.url} alt={item.title} fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="w-full aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center justify-center gap-2">
                                    <span className="text-2xl text-purple-500">{TYPE_ICONS[item.type]}</span>
                                    <span className="text-xs text-purple-400 uppercase font-bold">{item.type}</span>
                                </div>
                            )}
                            <div className="p-2">
                                <p className="text-xs font-semibold text-gray-700 truncate">{item.title}</p>
                                <p className="text-[10px] text-gray-400">{formatSize(item.size)}</p>
                            </div>
                            <button onClick={() => del(item.id)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity text-xs"
                            >
                                <FiTrash2 size={11} />
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
    const [form, setForm] = useState({ title: "", preacher: "", date: "", description: "" });
    const [audio, setAudio] = useState<File | null>(null);
    const [thumb, setThumb] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const load = async () => { setLoading(true); const r = await fetch("/api/admin/sermons"); setSermons(await r.json()); setLoading(false); };
    useEffect(() => { load(); }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        const fd = new FormData();
        if (editingId) fd.append("id", editingId.toString());
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (audio) fd.append("audio", audio);
        if (thumb) fd.append("thumbnail", thumb);
        const res = await fetch("/api/admin/sermons", { method: editingId ? "PUT" : "POST", body: fd });
        setSaving(false);
        if (res.ok) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title: "", preacher: "", date: "", description: "" });
            setAudio(null); setThumb(null);
            load();
        }
    };

    const edit = (s: Sermon) => {
        setForm({ title: s.title, preacher: s.preacher, date: s.date, description: (s as any).description || "" });
        setEditingId(s.id);
        setShowForm(true);
        setAudio(null);
        setThumb(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const del = async (id: number) => {
        if (!confirm("Delete this sermon?")) return;
        await fetch("/api/admin/sermons", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-gray-900">Sermons</h2>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 bg-purple-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-purple-700 transition">
                    <FiPlus size={14} /> Add
                </button>
            </div>

            {showForm && (
                <form onSubmit={save} className="bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-5 flex flex-col gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Title *</label>
                        <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Preacher *</label>
                            <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.preacher} onChange={(e) => setForm({ ...form, preacher: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Date *</label>
                            <input type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Audio File</label>
                        <input type="file" accept="audio/*" className="w-full text-xs" onChange={(e) => setAudio(e.target.files?.[0] || null)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Thumbnail</label>
                        <input type="file" accept="image/*" className="w-full text-xs" onChange={(e) => setThumb(e.target.files?.[0] || null)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                        <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={saving} className="flex-1 bg-purple-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-purple-700 transition disabled:opacity-50">
                            {saving ? "Saving…" : editingId ? "Update Sermon" : "Save Sermon"}
                        </button>
                        <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ title: "", preacher: "", date: "", description: "" }); }} className="px-4 text-gray-500 text-sm font-semibold">Cancel</button>
                    </div>
                </form>
            )}

            {loading ? <p className="text-center py-12 text-gray-400 text-sm">Loading…</p> : (
                <div className="flex flex-col gap-3">
                    {sermons.length === 0 ? <p className="text-gray-400 py-12 text-center text-sm">No sermons yet.</p> : sermons.map((s) => (
                        <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 shadow-sm">
                            {s.thumbnail_url ? (
                                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image src={s.thumbnail_url} alt={s.title} fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-400"><FiMusic size={20} /></div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 text-sm truncate">{s.title}</p>
                                <p className="text-gray-500 text-xs">{s.preacher} · {s.date}</p>
                                {s.audio_url && <audio controls src={s.audio_url} className="mt-1 w-full h-7" />}
                            </div>
                            <div className="flex flex-col gap-1 flex-shrink-0">
                                <button onClick={() => edit(s)} className="text-blue-400 hover:text-blue-600 p-1"><FiEdit2 size={16} /></button>
                                <button onClick={() => del(s.id)} className="text-red-400 hover:text-red-600 p-1"><FiTrash2 size={16} /></button>
                            </div>
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
    const [form, setForm] = useState({ title: "", date: "", time: "", location: "", description: "" });
    const [flyer, setFlyer] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const load = async () => { setLoading(true); const r = await fetch("/api/admin/events"); setEvents(await r.json()); setLoading(false); };
    useEffect(() => { load(); }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        const fd = new FormData();
        if (editingId) fd.append("id", editingId.toString());
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (flyer) fd.append("flyer", flyer);
        const res = await fetch("/api/admin/events", { method: editingId ? "PUT" : "POST", body: fd });
        setSaving(false);
        if (res.ok) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title: "", date: "", time: "", location: "", description: "" });
            setFlyer(null);
            load();
        }
    };

    const edit = (ev: Event) => {
        setForm({ title: ev.title, date: ev.date, time: ev.time || "", location: ev.location || "", description: (ev as any).description || "" });
        setEditingId(ev.id);
        setShowForm(true);
        setFlyer(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const del = async (id: number) => {
        if (!confirm("Delete this event?")) return;
        await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-gray-900">Events &amp; Flyers</h2>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 bg-purple-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-purple-700 transition">
                    <FiPlus size={14} /> Add
                </button>
            </div>

            {showForm && (
                <form onSubmit={save} className="bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-5 flex flex-col gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Title *</label>
                        <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Date *</label>
                            <input type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Time (e.g. 9:00 AM)</label>
                            <input type="text" placeholder="9:00 AM" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Location</label>
                        <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Flyer Image</label>
                        <input type="file" accept="image/*" className="w-full text-xs" onChange={(e) => setFlyer(e.target.files?.[0] || null)} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                        <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={saving} className="flex-1 bg-purple-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-purple-700 transition disabled:opacity-50">
                            {saving ? "Saving…" : editingId ? "Update Event" : "Save Event"}
                        </button>
                        <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm({ title: "", date: "", time: "", location: "", description: "" }); }} className="px-4 text-gray-500 text-sm font-semibold">Cancel</button>
                    </div>
                </form>
            )}

            {loading ? <p className="text-center py-12 text-gray-400 text-sm">Loading…</p> : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {events.length === 0 ? <p className="text-gray-400 py-12 text-center text-sm sm:col-span-3">No events yet.</p> : events.map((ev) => (
                        <div key={ev.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group relative">
                            {ev.flyer_url ? (
                                <div className="relative w-full aspect-[3/4] bg-gray-100">
                                    <Image src={ev.flyer_url} alt={ev.title} fill className="object-cover" unoptimized />
                                </div>
                            ) : (
                                <div className="w-full aspect-[3/4] bg-purple-100 flex items-center justify-center text-purple-400"><FiCalendar size={28} /></div>
                            )}
                            <div className="p-2">
                                <p className="font-bold text-gray-900 text-xs truncate">{ev.title}</p>
                                <p className="text-gray-500 text-[10px]">{ev.date}</p>
                            </div>
                            <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 active:opacity-100 transition">
                                <button onClick={() => edit(ev)} className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs shadow-sm hover:bg-blue-600">
                                    <FiEdit2 size={11} />
                                </button>
                                <button onClick={() => del(ev.id)} className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-sm hover:bg-red-600">
                                    <FiTrash2 size={11} />
                                </button>
                            </div>
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
    const [drawerOpen, setDrawerOpen] = useState(false);

    const logout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden md:flex w-56 flex-shrink-0 bg-[#1e1035] h-full flex-col">
                <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-400">
                        <Image src="/talknado_logo.jpeg" alt="Logo" fill className="object-cover" />
                    </div>
                    <div className="leading-tight">
                        <p className="text-white font-bold text-xs uppercase tracking-wide">BBM Admin</p>
                        <p className="text-purple-300 text-[10px]">Content Manager</p>
                    </div>
                </div>
                <nav className="flex-1 py-5 px-3 flex flex-col gap-1">
                    {NAV_ITEMS.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full text-left ${tab === id ? "bg-purple-600 text-white" : "text-purple-200 hover:bg-white/10"}`}
                        >
                            {icon} {label}
                        </button>
                    ))}
                </nav>
                <button onClick={logout} className="flex items-center gap-3 mx-3 mb-5 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/20 rounded-xl transition-all">
                    <FiLogOut size={16} /> Log Out
                </button>
            </aside>

            {/* ── Mobile Drawer Overlay ── */}
            {drawerOpen && (
                <div className="fixed inset-0 z-40 md:hidden" onClick={() => setDrawerOpen(false)}>
                    <div className="absolute inset-0 bg-black/50" />
                    <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#1e1035] flex flex-col z-50" onClick={(e) => e.stopPropagation()}>
                        <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-purple-400">
                                    <Image src="/talknado_logo.jpeg" alt="Logo" fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xs uppercase tracking-wide">BBM Admin</p>
                                    <p className="text-purple-300 text-[10px]">Content Manager</p>
                                </div>
                            </div>
                            <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white"><FiX size={20} /></button>
                        </div>
                        <nav className="flex-1 py-5 px-3 flex flex-col gap-1">
                            {NAV_ITEMS.map(({ id, label, icon }) => (
                                <button key={id} onClick={() => { setTab(id); setDrawerOpen(false); }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full text-left ${tab === id ? "bg-purple-600 text-white" : "text-purple-200 hover:bg-white/10"}`}
                                >
                                    {icon} {label}
                                </button>
                            ))}
                        </nav>
                        <button onClick={logout} className="flex items-center gap-3 mx-3 mb-6 px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20 rounded-xl transition-all">
                            <FiLogOut size={16} /> Log Out
                        </button>
                    </aside>
                </div>
            )}

            {/* ── Main content area ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile header */}
                <header className="md:hidden bg-[#1e1035] px-4 py-3 flex items-center justify-between flex-shrink-0">
                    <button onClick={() => setDrawerOpen(true)} className="text-white p-1">
                        <FiMenu size={22} />
                    </button>
                    <span className="text-white font-bold text-sm uppercase tracking-widest">BBM Admin</span>
                    <button onClick={logout} className="text-red-300 p-1">
                        <FiLogOut size={18} />
                    </button>
                </header>

                {/* Scrollable content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
                    {tab === "upload" && <UploadTab />}
                    {tab === "media" && <MediaTab />}
                    {tab === "sermons" && <SermonsTab />}
                    {tab === "events" && <EventsTab />}
                </main>

                {/* Mobile bottom tab bar */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-30">
                    {NAV_ITEMS.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-[10px] font-bold transition-colors ${tab === id ? "text-purple-600" : "text-gray-400"}`}
                        >
                            {icon}
                            {label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
