# 事前準備

> [!WARNING]
> Googleアカウントが必須です。

## 1. Google Spread Sheetを作成する
スプレッドシートを開き、`新入生DB`という名称のシートを作成してください。  
※データもこの際追加してください。

## 2. 動作環境を整える
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
