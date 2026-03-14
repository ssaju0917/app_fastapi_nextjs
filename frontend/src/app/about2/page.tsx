// 資料 p.26のイメージ
export default function UserCard() {
  return (
      <div className="m-4 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      {/* Flexbox layout */}
      <div className="flex items-center space-x-4">
      {/* Avatar: w=width, h=height, rounded-full=circle */}
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-bold text-lg">U</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Next.js User</h2>
          <p className="text-sm text-slate-400">Frontend Developer</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-slate-300 leading-relaxed">
          TailWind CSSを使うと、HTMLのクラスの属性だけで... 
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
          Follow
        </button>
      </div>
    </div>
  );
}