import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

const config = {
  // ... 他の設定
  plugins: [
    iconsPlugin({
      // 使いたいアイコンセットを指定（例: Heroicons と Lucide）
      collections: getIconCollections(["heroicons", "lucide"]),
    }),
  ],
};
export default config;