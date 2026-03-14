import { Button } from "./component/Button";
import { Card } from "./component/Card";

export default function ResposiveDemo() {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      {/* テキストサイズの変更：　スマホでsm, PCでxl */}
      <h2 className="text-sm md:text-xl lg:text-3xl">
        レスポンシブなタイトル  
      </h2>

      {/* 表示/非表示の切り替え */}
      <p className="block md:hidden text-red-400">
        これはモバイルでのみ表示されます。
      </p>
      <p className="hidden md:block text-blue-400">
        これはタブレット以上の画面で表示されます。
      </p>
      
      {/* グリッドカラム数: モバイル1列、タブレット2列、PC4列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded">Box-1</div>
        <div className="bg-slate-800 p-4 rounded">Box-2</div>
        <div className="bg-slate-800 p-4 rounded">Box-3</div>
        <div className="bg-slate-800 p-4 rounded">Box-4</div>
      </div>


      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="カードタイトル" children="カードの内容" footer={<Button variant="primary">アクション</Button>}></Card>
      </div>

      <div className="mt-8">
        <Button variant="primary">保存</Button>
        <Button variant="ghost" className="ml-4">キャンセル</Button>
      </div>
    </div>
  );
}