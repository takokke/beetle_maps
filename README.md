# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
    
    ``ruby 3.2.2``

* System dependencies
    - stuck Heroku 22
    -  Node.js 16系
    - PostgreSQL
* Configuration

* Database creation
```
docker compose exec web rails db:create
```

* Database initialization
```
docker compose exec web rails db:reset
```
* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Docker導入
ビルド(bundle install)
```
docker compose build
```
起動
```
docker compose up (-d)
```
停止
```
docker compose down
```
例: webコンテナ(rails)に入りコマンドを実行したいとき
```
docker-compose run web bash # コンテナに入れる

docker compose exec web bundle update --ruby # コンテナに一旦入らずに行える
```
## バージョンアップ
### 24/05/30
- Rails6系　-> Rails7系
- Ruby3.1.2 -> Ruby3.2.2　に変更