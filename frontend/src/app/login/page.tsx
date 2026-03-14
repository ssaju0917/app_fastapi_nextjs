"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn(
            "credentials",
            { 
                username,
                password,
                redirect: false,
                // 手動でリダイレクト制御
            }
        );
        if (result?.error) {
            setError("ログインに失敗しました");
        } else {
            router.push("/diaries");
            // ログイン成功時
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className="w-96 space-y-4">
                <h1 className="text-2xl font-bold">ログイン</h1>
                {error && <p className="text-red-500">{error}</p>}
                <input type="text" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded" />
                <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">ログイン</button>
            </form>
        </div>
    );
}