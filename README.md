# Beetle Maps
## URL 
https://beetle-maps-de39f8a12b44.herokuapp.com

## 概要
このアプリは、カブトムシやクワガタを見つけた場所をみんなに共有できるサイトです。友達が「カブトムシ見つけたいけど、どこにおるか分からない」という話を聞いたのがきっかけで制作しました。

## 主な機能
- ユーザーが昆虫の見つけた場所をGoogle Maps上にマッピング
- 写真やコメントの投稿機能
- 他のユーザーが投稿した情報を閲覧する機能

## こだわった点、注意した点:
- 投稿画面のユーザーエクスペリエンスにこだわりました。Google Mapsをクリックしたときに、位置情報が入力されます。また、写真をアップロードしたときにExif情報を取り出して、日付が自動入力されるように工夫しました。
こちらが位置情報と日付が入力されている様子です。https://drive.google.com/file/d/1EU2KieLdTpefa9jh3EvA0ndq6tESfEjj/view?usp=sharing
- Google Maps APIの使用によって、視覚的に分かりやすいマッピングを実現しました。

### Docker導入
起動
```
docker compose up
```
停止
```
docker compose down
```
コンテナに入り、bashを起動
```
docker compose run web bash
```

### 変更
#### 2024/05/30 RubyとRailのバージョンアップ
- Ruby 3.1.2 -> 3.2.2
- Rails 6.x -> 7.x

に変更
