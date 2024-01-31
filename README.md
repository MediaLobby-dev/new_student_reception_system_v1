# 新入生受付システム

## 概要
PCセットアップガイダンスでの受付を行う際に、新入生の方が持っているバーコードを読み取り、本人確認を行うシステムです。
(詳しくはSlackの `#新入生受付システム` チャンネルを参照してください。)

## 開発環境 (2024-01-26 現在)
- Volta 1.1.1
- Node.js v18.18.2
- pnpm 8.14.1

## 本番環境へ展開する方法
> [!NOTE]
> 「開発の手引」の 0番 から 3番 までを完了させておいてください。

### 1. スプレッドシートを作成する
スプレッドシートを開き、`新入生DB`という名称のシートを作成してください。  
※データもこの際追加してください。

### 2. プログラムをGAS上に展開する
```bash
pnpm run build && pnpm run push
```

### 3. 受付用のPCにて、Chromeをキオスクモードで起動する
```ps1
> "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --kiosk-printing --disable-pinch "<スプレッドシートのURL>"
```

または、本プロジェクトルート直下にある`start.bat`を実行することで起動できます。(batファイルは可搬です)
```ps1
> start.bat "<スプレッドシートのURL>"
```
**Chromeのプロセスが完全に終了していることを確認してから実行してください。プロセスが生存している状態で実行するとキオスクモードで起動しません！！**

## 開発の手引
> [!WARNING]
> 基本的にローカルではWebパネルのみ開発しかできません。サーバー側の開発は、逐一GAS上にプッシュして確認する必要があります。  
> また、Windows環境での開発は推奨しません。WSL2をお使いください。

### 0. 開発環境を整える
#### Voltaのインストール
```bash
curl https://get.volta.sh | bash
```

#### Node.jsのインストール
```bash
volta install node@18.18.2
```

#### pnpmのインストール
```bash
volta install pnpm@8.14.1
```

#### claspのインストール
```bash
volta install @google/clasp
```

#### typescriptのインストール
```bash
volta install typescript
```

### 1. このレポジトリをクローンする
```bash
git clone
```

### 2. 依存パッケージをインストールする
```bash
pnpm install
```

### 3. `.clasp.json` ファイルを作成する
`.clasp.json.sample` から `.clasp.json` ファイルを作成してください。
```bash
cp .clasp.json.sample .clasp.json
```

```
{
  "scriptId": "スクリプトID",
  "rootDir": "coreディレクトリまでの絶対パス/core"
}
```

スクリプトIDは、GASのスクリプトを開いた際のURLの `https://script.google.com/home/projects/<スクリプトID>/edit` の部分です。

[Tips] 以下のコマンドで、coreディレクトリまでの絶対パスを取得できます。(一例)
```bash
$ pwd core
/home/<ユーザ>/newStudentReceptionSystem
```

### 4. 開発サーバーを起動する (Webパネル側の開発のみ)
```bash
pnpm run dev
```

### 5. ビルドする
```bash
pnpm run build
```

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
