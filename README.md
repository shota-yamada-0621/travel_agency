### travel_agency

旅行会社の管理システムを模倣した、インターン生向けのReactプロジェクトです。

WEBからアクセスも可能です。  
https://master.d2mll64f0sjadt.amplifyapp.com/reservations/

### 始め方

```
cd travel_agency_client
npm install
npm run dev
```

### 開発者用ドキュメント

### 1. ディレクトリ構成

React のディレクトリ構成は Atmic design ではなく、下記を参考にして作成しています。
https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
主に、改修作業時に作成したコンポーネントをどこに格納すれば良いのか迷わないことを重視しています。

```
src
|
+-- app               # application layer containing:
|   |                 # this folder might differ based on the meta framework used
|   +-- routes        # application routes / can also be pages
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers - this might also differ based on meta framework used
|   +-- router.tsx    # application router configuration
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- test              # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

### 3. 開発ルール

masterに反映させるときversion管理したいが、tagを付けるのがめんどくさいのでgit flowで開発します。

```
cd travel_agency_client
git flow init -d
```

#### 開発開始時


```
$ git flow feature start <ブランチ名>
(コーディング、動作確認)
$ git add .
$ git commit -m "<コミットメッセージ>"
$ git flow feature finish <ブランチ名>
```

### リリース時

現在の最新versionはgithubを確認してください

```
$ git flow release start <バージョン>
(動作テストを行う。もし不具合があったらreleaseブランチ内で修正を実施する)
$ git flow release finish <バージョン>
$ git push -u origin develop
$ git push -u origin master
$ git push --tag
```

### 本番環境で修正が必要な場合

(本番用ブランチである master で修正が必要な場合)

```
$ git flow hotfix start <バージョン>
（ソース修正作業）
$ git flow hotfix finish <バージョン>
$ git push -u origin develop
$ git push -u origin master
$ git push --tag
```

### コミットメッセージのルール

下記方式で作成してください。
"(prefix): (日本語で修正内容を分かりやすく記述)"

**prefix一覧**
```
feat: 新しい機能
update: 既存機能の改修
fix: バグの修正
docs: ドキュメントのみの変更
style: 空白、フォーマット、セミコロン追加、css系など
refactor: リファクタリング
perf: パフォーマンス向上関連
test: テスト関連
chore: ビルド、補助ツール、ライブラリ関連
image: 画像などの追加
```
(参考) https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e