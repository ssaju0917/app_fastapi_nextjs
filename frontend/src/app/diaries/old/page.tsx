"use client";
import { fetcher } from '@/lib/api';
import { DiaryCreate } from '@/types';
import { useEffect, useState } from 'react';

type Diary = {
  id: number;
  title: string;
  content: string;
  diary_date: string;
};

export default function DiariesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    loadDiaries();
  }, []);

  const loadDiaries = async () => {
    try {
      const res = await fetcher('/api/diaries');
      const data = await res;
      setDiaries(data);
    } catch (error) {
      console.error('Failed to load diaries:', error);
    }
  };

  const handleSave = async () => {
    // ここで新しい日記を保存するAPIを呼び出すロジックを実装
    // 例: await fetch('/api/diaries', { method: 'POST', body: JSON.stringify(newDiary) });
    // 保存後に日記のリストを再読み込みするためにloadDiaries()を呼び出す
    const payload: DiaryCreate = { title, content };
    try {
      if (!title || !content) {
        alert("タイトルと内容を入力してください");
        return;
      }
      await fetcher('/api/diaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setTitle("");
      setContent("");
      loadDiaries();
    } catch (error) {
      console.error('Failed to save diary:', error);
    }
  }

  const handleDelete = async (diaryId: number) => {
    // ここで日記を削除するAPIを呼び出すロジックを実装
    // 例: await fetch(`/api/diaries/${diaryId}`, { method: 'DELETE' });
    // 削除後に日記のリストを再読み込みするためにloadDiaries()を呼び出す
    try {
      await fetcher(`/api/diaries/${diaryId}`, { method: 'DELETE' });
      loadDiaries();
    } catch (error) {
      console.error('Failed to delete diary:', error);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">日記</h1>
        <div className="rounded-2xl border p-4 shadow-sm space-y-3 bg-white">
          <input className="w-full border rounded p-2" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="w-full border rounded p-2" placeholder="内容" rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleSave} className="px-4 py-2 rounded bg-slate-800 text-white">保存</button>
        </div>
        {diaries.map((diary) => (
          <div  key={diary.id} className="rounded-2xl border p-4 shadow-sm bg-white">
            <div className="mb-4 border-b pb-4 last:border-0 last:pb-0">
              <p className="text-sm text-slate-400 mt-2">{diary.diary_date}</p>
              <h2 className="text-xl font-semibold">{diary.title}</h2>
              <div className="mt-2 mb-4 border-b">
                <p className="text-slate-600">{diary.content}</p>
                <button onClick={() => handleDelete(diary.id)} className="px-4 py-2 rounded text-red-500 float-right">削除</button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
