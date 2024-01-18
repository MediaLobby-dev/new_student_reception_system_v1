# 新入生受付システム

## 概要
PCキッティング会場にて受付を行う際に、新入生の方が持っているバーコードを読み取り、本人確認を行うシステムです。
(詳しくはSlackの `#新入生受付システム` チャンネルを参照してください。)

## 開発環境
- Node.js v18.18.2
- pnpm 8.14.1

## 開発の手引
> [!WARNING]
> 基本的にローカルではWebパネルのみ開発しかできません。サーバー側の開発は、逐一GAS上にプッシュして確認する必要があります。

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



