"use client";
import { useState } from "react";

export default function Page() {
  const [logs, setLogs] = useState<string[]>([]);

  const run = () => {
    setLogs([]); // ログをクリア
    const newLogs: string[] = [];

    // 1. 同期処理（すぐに実行）
    newLogs.push("① Sync: Start");

    // 3. マクロタスク（最後に実行される）
    setTimeout(() => {
      setLogs(prev => [...prev, "③ Macro: setTimeout (1000ms)"]);
    }, 1000);

    // 2. マイクロタスク（同期の直後に実行）
    Promise.resolve().then(() => {
      setLogs(prev => [...prev, "② Micro: Promise.then"]);
    });

    // 1. 同期処理（すぐに実行）
    newLogs.push("① Sync: End");
    setLogs(newLogs);
  };

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">⚡ イベントループ実験</h1>
      
      <button 
        onClick={run}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold"
      >
        ▶ 実行して順序を確認
      </button>

      <div className="bg-slate-900 text-slate-100 p-6 rounded-lg min-h-[200px]">
        <h3 className="text-slate-400 text-sm mb-3 border-b border-slate-700 pb-2">
          Console Logs:
        </h3>
        <ul className="space-y-2 font-mono">
          {logs.map((log, i) => (
            <li key={i} className="flex items-center">
              <span className="text-green-400 mr-2"></span> {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}