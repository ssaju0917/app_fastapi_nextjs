"use client";
import { useState } from "react";

// 1秒待つだけの擬似関数
const wait1sec = async (name: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `${name} data`;
};

export default function Page() {
  const [log, setLog] = useState("");

  // ❌ アンチパターン: awaitの直列化
  const runBadPattern = async () => {
    setLog("⏳ 処理開始...");
    const start = performance.now();

    // 1つ目のデータ取得（ここで1秒止まる）
    const user = await wait1sec("User");

    // 2つ目のデータ取得（さらに1秒止まる）
    const posts = await wait1sec("Posts");

    const end = performance.now();
    const time = ((end - start) / 1000).toFixed(2);
    setLog(`⏱️ 合計時間: ${time}秒 (データ: ${user}, ${posts})`);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">await直列化のテスト</h1>
      <button 
        onClick={runBadPattern}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        直列実行テスト
      </button>
      <p className="mt-6 text-xl font-mono bg-gray-100 p-4 rounded">
        {log}
      </p>
    </div>
  );
}