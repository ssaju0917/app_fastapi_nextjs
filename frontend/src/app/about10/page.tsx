"use client";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("入力してください");

  useEffect(() => {
    // 1. コントローラーを作成
    const controller = new AbortController();

    // 2. 疑似APIリクエスト（signalを渡す）
    const fetchData = async () => {
      try {
        setResult("検索中...");
        // 実際は fetch('/api/search', { signal: controller.signal })
        await new Promise((resolve, reject) => {
          const id = setTimeout(resolve, Math.random() * 2000); // 0-2秒遅延
          controller.signal.addEventListener("abort", () => {
            clearTimeout(id);
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
        setResult(`「${query}」の結果`);
      } catch (err: any) {
        if (err.name !== "AbortError") setResult("エラー");
      }
    };

    if (query) fetchData();

    // 3. クリーンアップ関数で前回の処理をキャンセル
    return () => controller.abort();
  }, [query]);

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-xl font-bold">競合状態の対策デモ</h1>
      <input
        className="border p-2 w-full rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索ワードを入力（連打して試す）"
      />
      <div className="text-2xl font-bold text-blue-600">{result}</div>
    </div>
  );
}