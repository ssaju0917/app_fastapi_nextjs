"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/lib/api";
import { User } from "@/types";
import UserFeatureList from "./UserFeatureList";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");

  const loadUsers = async () => {
    try {
      // リファクタリング後のパス "/api/users/" を指定
      const data = await fetcher("/api/users/");
      setUsers(data);
    } catch (e) {
      console.error("Failed to load users", e);
    }
  };

  const handleCreateUser = async () => {
    if (!name) return;
    await fetcher("/api/users/", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    setName("");
    loadUsers();
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await fetcher(`/api/users/${userId}`, { method: "DELETE" });
      loadUsers();
    } catch (e) {
      alert("ユーザーの削除に失敗しました");
    }
  }

  useEffect(() => { loadUsers(); }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-4">新規ユーザー登録</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力してください"
          />
          <button 
            onClick={handleCreateUser}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            追加
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        <h2 className="text-xl font-bold">ユーザー一覧</h2>
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <span className="font-bold text-xl text-slate-800">{user.name}</span>
              <button 
                onClick={() => handleDeleteUser(user.id)} 
                className="text-red-400 hover:text-red-600 text-sm"
              >
                ユーザーを削除
              </button>
            </div>

            {/* ここで紹介項目コンポーネントを呼び出す */}
            <UserFeatureList user={user} onUpdate={loadUsers} />
          </div>
        ))}
      </div>
    </div>
  );
}