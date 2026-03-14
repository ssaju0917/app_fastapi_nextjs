// シンプルなコンポーネント定義
export default function Hello() {
  const name = 'World';
  const style = { color: 'blue'};

  // return内がJSX（HTMLに似た構文）
  return (
    <div className="container">
      <h1 style={style}>
        Hello, {name}!
      </h1>
      <p>Welcome to Next.js!</p>

      {/* コンポーネントの再利用 */}
      <Button label="Click me" />
    </div>
  );
}

// Propsを受け取るコンポーネント
function Button({ label }) {
  return <button>{label}</button>;
}