"use client";
import { useState, useEffect } from "react";

export default function EffectDemo() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // ログ追加用ヘルパー
  const addLog = (msg: string) => setLog((p) => [...p, msg]);

  // ✅ パターン1: 依存配列あり [count]
  // countが変わるたびに実行される
  useEffect(() => {
    addLog(`🔵 Effect実行 (Count: ${count})`);

    // クリーンアップ関数（次の実行前やアンマウント時に動く）
    return () => {
      addLog(`🔴 Cleanup (Count: ${count})`);
    };
  }, [count]); 

  // ✅ パターン2: 空配列 []（マウント時のみ）
  useEffect(() => {
    addLog("🟢 マウントされました（初回のみ）");
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">useEffect 動作確認</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Count Up ({count})
        </button>
        <button
          onClick={() => setLog([])}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          ログ消去
        </button>
      </div>
      <div className="bg-slate-900 text-green-400 p-4 rounded h-64 overflow-auto text-sm font-mono">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        {log.length === 0 && <span className="text-gray-500">ログなし</span>}
      </div>
    </div>
  );
}