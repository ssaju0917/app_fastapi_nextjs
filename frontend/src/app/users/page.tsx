import UserManagement from "@/features/users/components/UserManagement";

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ユーザー管理</h1>
      <UserManagement />
    </div>
  );
}