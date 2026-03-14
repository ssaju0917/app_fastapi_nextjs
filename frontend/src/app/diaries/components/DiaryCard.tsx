'use client';

import { useState } from 'react';

type DiaryCardProps = {
    title: string;
    content: string;
    date: string;
    deleteDiary: () => void;
    editDiary: (title: string, content: string) => void;
};

export default function DiaryCard({ title, content, date, deleteDiary, editDiary }: DiaryCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);

    return (
        <div className="rounded-2xl border p-4 shadow-sm bg-white">
            <div className="space-y-1">
                { !isEditing ? (
                    <div className="space-y-1">
                        <div className="text-sm text-slate-500">{date}</div>
                        <div className="font-semibold text-lg">{editedTitle}</div>
                        <div className="text-slate-700 mt-2">{editedContent}</div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="w-full border rounded p-2 mb-2" />
                        <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="w-full border rounded p-2" rows={4}></textarea>
                    </div>
                )}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
                
                {isEditing ? (
                    <div>
                        <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={() => { setIsEditing(false); editDiary(editedTitle, editedContent); }}>
                            保存
                        </button>
                        <button className="px-4 py-2 rounded border ml-2" onClick={() => { setIsEditing(false); setEditedTitle(title); setEditedContent(content); }}>
                            キャンセル
                        </button>
                    </div>
                ) : (
                    <div>
                        <button  className="px-4 py-2 rounded bg-red-600 text-white" onClick={deleteDiary}>
                            削除
                        </button>
                        <button className="px-4 py-2 rounded border ml-2" onClick={() => setIsEditing(true)}>
                            編集
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}