"use client";
import { useState, useEffect } from "react";

// 1秒待つだけの擬似fetch関数
const fetchMock = async (name: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `${name} data`;
};

export default function Page() {
  const [data, setData] = useState<string[]>([]);
  const [status, setStatus] = useState("待機中");

  // useEffect内で非同期処理を実行
  useEffect(() => {
    const loadData = async () => {
      setStatus("⏳ データ取得中...");
      const start = performance.now();

      // ✅ 良い例: Promise.allで2つ同時に開始（並列）
      const [user, posts] = await Promise.all([
        fetchMock("User"),
        fetchMock("Posts")
      ]);

      const end = performance.now();
      const time = ((end - start) / 1000).toFixed(2);
      
      setData([user, posts]);
      setStatus(`✅ 完了! 所要時間: ${time}秒`);
    };

    loadData();
  }, []); // 初回レンダリング時のみ実行

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">並行データ取得</h1>
      <p className="text-lg font-bold mb-6 text-blue-600">
        {status}
      </p>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded border border-gray-300">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}