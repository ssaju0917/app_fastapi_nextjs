"use client";
import { useState } from "react";

export default function StateDemo() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "Alice", age: 25 });

  const handleSnapshot = () => {
    // スナップショットのテスト: この関数内では count は0のまま
    setCount(count + 1);
    alert(`画面の値は増えますが、\nここの変数はまだ ${count} です！`);
  };

  const updateAge = () => {
    // ✅ 正解: 新しいオブジェクトを作成 (イミュータブル)
    setUser((prev) => ({ ...prev, age: prev.age + 1 }));
  };

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-6">useState Demo</h1>
      
      <div className="flex gap-6">
        <div className="p-4 border rounded bg-white">
          <p className="font-bold text-xl mb-2">Count: {count}</p>
          <button onClick={handleSnapshot} 
            className="bg-blue-500 text-white px-4 py-2 rounded">
            +1 & Check
          </button>
        </div>

        <div className="p-4 border rounded bg-white">
          <p className="font-bold text-xl mb-2">
            {user.name} ({user.age})
          </p>
          <button onClick={updateAge} 
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Birthday (+1)
          </button>
        </div>
      </div>
    </div>
  );
}