### 環境構築
* 設定ファイルのダウンロード
  * Firestoreのコンソールからサービスアカウントのjsonをダウンロード
  * secディレクトリ以下に配置
  * Constファイルにパスを書き込む
* supabaseの情報を設定
  * ファイルをコピー

  ```
  $ cp functions/.env.{sample,vc-space}
  $ cp functions/.env.{sample,vc-space-dev}
  ```

  * supabaseのWebUIのAPI欄からURLとsecretキーをコピー


### 環境切り替え
```
$ firebase use default
$ firebase use production
```

### Functionsの開発
* 型ファイル作成
  ```
  $ mv <supabaseリポジトリ>
  $ supabase gen types typescript --linked > SupabaseSchema.ts
  ```
* lib以下に配置

* ローカルでサービング
```
$ npm run build
$ firebase serve --only functions
```

  * ソース更新時はbuildをする

### Functionsのデプロイ
```
$ firebase deploy --only functions
```

### ルールのデプロイ
```
$ firebase deploy --only firestore:rules
```

### テスト
```
$ firebase emulators:start --only firestore

* 別ウィンドウ
$ npm run test
```

### CLIコマンド例
* テスト部屋を10個作成する
```
$ ./functions/node_modules/.bin/ts-node functions/src/cli.ts room -n 10
```

* ユーザー情報をすべて消す
```
$ ./functions/node_modules/.bin/ts-node functions/src/cli.ts user -d
```

* 本番情報を消す
```
$ ./functions/node_modules/.bin/ts-node functions/src/cli.ts --env prod user -d
```