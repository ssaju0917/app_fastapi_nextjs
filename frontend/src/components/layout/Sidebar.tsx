import Link from "next/link";

const MENU_ITEMS = [
  { name: "🏠 ホーム", href: "/" },
  { name: "👥 ユーザー管理", href: "/users" },
  { name: "📔 日記管理", href: "/diaries" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col h-screen">
      <div className="p-6 text-xl font-bold border-b border-slate-700">
        Dev Lecture App
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block p-3 rounded hover:bg-slate-700 transition">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}