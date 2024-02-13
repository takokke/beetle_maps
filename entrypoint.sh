#!/bin/bash
set -e

# server.pidが残っているとrailsが起動できないので削除する
rm -f /myapp/tmp/pids/server.pid

# コンテナーのプロセスを実行する(Dockerfile 内の CMD に設定されているもの)
exec "$@"