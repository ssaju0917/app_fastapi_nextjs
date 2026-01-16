# Node.jsイメージを使用
FROM node:20-slim

# 作業ディレクトリを /app に設定
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 開発用サーバーを起動
# ホスト(Mac)側からアクセスできるように --host 0.0.0.0 相当が必要
CMD ["npm", "run", "dev"]