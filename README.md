# 新入生受付システム

## 概要
PCセットアップガイダンスでの受付を行う際に、新入生の方が持っているバーコードを読み取り、本人確認を行うシステムです。
(詳しくはSlackの `#新入生受付システム` チャンネルを参照してください。)

## ヘルプページ
属人化防止のため、すべての情報をこのリポジトリにまとめています。  
また、情報の透明化・後輩への引き継ぎを積極的に行っております。  
導入方法や使い方については、[こちら](./docs/00-top-page.md) を参照してください。

お手数ですが、不足点は随時修正いただき、PRを出していただけると助かります。

## プロジェクト構造
```
.
├── README.md
├── components # Webパネルのコンポーネント
│   ├── Button
│   │   ├── index.tsx
│   │   └── styles.module.scss
│   ├── Footer
│   │   └── index.tsx
│   ├── MessageBox
│   │   └── index.tsx
│   ├── RemarkInputBox
│   │   └── index.tsx
│   ├── StudentIdInputBox
│   │   └── index.tsx
│   └── UserView
│       ├── index.tsx
│       └── styles.module.scss
├── core # GASのコードとビルド後のWebパネルデータ (clasp pushでGASにプッシュされるフォルダ)
│   ├── appsscript.json
│   ├── main.ts
│   ├── print.html
│   └── webpanel
│       └── index.html
├── hooks
│   └── useStudentData.tsx
├── index.html
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── App.tsx
│   ├── gas.ts
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
