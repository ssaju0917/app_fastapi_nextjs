"use client";

import { useState } from "react";
import { fetcher } from "@/lib/api";
import { User } from "@/types";

export default function UserFeatureList({ user, onUpdate }: { user: User; onUpdate: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddFeature = async () => {
    if (!name || !description) return;
    try {
      // バックエンドのパス: /api/features/{user_id}/
      await fetcher(`/api/features/${user.id}/`, {
        method: "POST",
        body: JSON.stringify({ name, description }),
      });
      setName("");
      setDescription("");
      onUpdate(); // 親コンポーネント（UserManagement）の一覧を更新
    } catch (e) {
      alert("追加に失敗しました");
    }
  };

  const handleDeleteFeature = async (featureId: number) => {
    try {
      await fetcher(`/api/features/${featureId}`, { method: "DELETE" });
      onUpdate();
    } catch (e) {
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
      <h4 className="text-sm font-bold text-slate-700 mb-3">自己紹介項目</h4>
      
      {/* 既存項目の表示 */}
      <ul className="space-y-2 mb-4">
        {user.features.map((f) => (
          <li key={f.id} className="flex justify-between items-center bg-white p-2 rounded shadow-sm text-sm text-black">
            <span><strong>{f.name}</strong>: {f.description}</span>
            <button onClick={() => handleDeleteFeature(f.id)} className="text-red-500 hover:text-red-700 text-xs">削除</button>
          </li>
        ))}
      </ul>

      {/* 新規入力フォーム */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input 
          placeholder="項目名 (例: 趣味)" 
          className="border p-1 text-sm rounded text-black"
          value={name} onChange={(e) => setName(e.target.value)}
        />
        <input 
          placeholder="内容 (例: 読書)" 
          className="border p-1 text-sm rounded text-black"
          value={description} onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button 
        onClick={handleAddFeature}
        className="w-full bg-slate-600 text-black text-xs py-1.5 rounded hover:bg-slate-700 transition"
      >
        ＋ 項目を追加
      </button>
    </div>
  );
}