// 使用例
import { Button } from './component/Button';
import { Card } from './component/Card';

export default function AboutPage() {
  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ボタンコンポーネント表示</h1>
        <Button variant="primary">保存する</Button>
        <Button variant="ghost" className="ml-2">キャンセル</Button>
        <br />
        <br />
        <h1 className="text-2xl font-bold mb-4">カードコンポーネントの表示</h1>
        <Card title="カードタイトル" children="カードの内容" footer={<Button variant="primary">アクション</Button>}></Card>
    </div>
  );
}