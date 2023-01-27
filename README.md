### 環境構築
* 設定ファイルのダウンロード

    * Firestoreのコンソールからサービスアカウントのjsonをダウンロード
    * secディレクトリ以下に配置
    * Constファイルにパスを書き込む
```

### 環境切り替え
```
$ firebase use default
$ firebase use production
```

### ルールのデプロイ
```
$ firebase deploy --only firestore:rules
```

### テスト
```
$ firebase emulators:start --only firestore

# 別ウィンドウ
$ npm run test
```

### CLIコマンド例

* テスト部屋を10個作成する
```
$ ./node_modules/.bin/ts-node src/cli.ts room -n 10
```

* ユーザー情報をすべて消す
```
$ ./node_modules/.bin/ts-node src/cli.ts user -d
```

* 本番情報を消す
```
$ ./node_modules/.bin/ts-node src/cli.ts --env prod user -d
```