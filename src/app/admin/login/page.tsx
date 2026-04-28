"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        setLoading(false);
        if (res.ok) {
            router.push("/admin");
            router.refresh();
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3b0082] to-[#6d28d9] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg mb-4">
                        <Image src="/talknado_logo.jpeg" alt="Logo" fill className="object-cover" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Bible Believing Mission — CMS</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter admin password"
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5B21B6] hover:bg-[#4C1D95] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-60"
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
