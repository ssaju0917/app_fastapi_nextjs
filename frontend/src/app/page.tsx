// import UserProfileFeature from "@/app/users/components/UserProfileFeature";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">自己紹介アプリ</h1>
        <p className="text-slate-500">ユーザーの管理と紹介項目の登録ができます。</p>
      </header>

      {/* 以前作成したメインロジックをここに配置 */}
      {/* <UserProfileFeature /> */}
    </div>
  );
}