"use client"
import {useState, useEffect} from "react";
import DiaryCard from "./components/DiaryCard";
import { fetcher } from '@/lib/api';

type Diary = {
    id: number;
    title: string;
    content: string;
    diary_date: string;
};

type DiaryCreate = {
    title: string;
    content: string;
};

export default function DiariesPage() {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const loadDiaries = async () => {
        const data: Diary[] = await fetcher("/api/diaries");
        setDiaries(data);
    };

    useEffect(() => {
        loadDiaries();
    }, []);

    const handleSubmit = async (title: string, content: string) => {
        const payload: DiaryCreate = { title, content };
        if (!title || !content) {
            alert("タイトルと内容を入力してください");
            return;
        }
        await fetcher("/api/diaries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setTitle("");
        setContent("");

        await loadDiaries();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("削除しますか？")) {
            return;
        }
        await fetcher(`/api/diaries/${id}`, {
            method: "DELETE",
        });
        await loadDiaries();
    };

    const handleEdit = async (id: number, title: string, content: string) => {
        const payload: DiaryCreate = { title, content };

        if (!title || !content) {
            alert("タイトルと内容を入力してください");
            return;
        }

        if (!confirm("保存しますか？")) {
            return;
        }

        await fetcher(`/api/diaries/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        await loadDiaries();
    }

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">日記</h1>
            <span className="i-heroicons-users"></span>
            <div className="rounded-2xl border p-4 shadow-sm space-y-3 bg-white">
                <input className="w-full border rounded p-2" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="w-full border rounded p-2" placeholder="内容" value={content} onChange={(e) => setContent(e.target.value)} />
                <div className="flex justify-end">
                    <button className="px-4 py-2 rounded bg-slate-800 text-white" onClick={() => handleSubmit(title, content)} >保存</button>
                    <button className="px-4 py-2 rounded bg-white-800 border ml-2" onClick={() => { setTitle(""); setContent(""); }}>クリア</button>
                </div>
            </div>
            <div className="space-y-4">
                {diaries.map(diary => (
                    <DiaryCard
                        key={diary.id} 
                        title={diary.title} 
                        content={diary.content} 
                        date={diary.diary_date} 
                        deleteDiary={() => handleDelete(diary.id)} 
                        editDiary={(title: string, content: string) => handleEdit(diary.id, title, content)} 
                    />
                ))}
            </div>
        </div>
    )
}