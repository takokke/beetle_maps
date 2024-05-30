FROM ruby:3.1.2
FROM ruby:3.2.2

# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

# yarnパッケージ管理ツールをインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn

# # nodejsをインストール
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs


# # yarnをnpmでインストール
# RUN npm install --global yarn


# postgresqlをインストール
RUN apt-get update && apt-get install -y postgresql-client --no-install-recommends && rm -rf /var/lib/apt/lists/*


WORKDIR /beetle_maps

ADD Gemfile /beetle_maps/Gemfile
ADD Gemfile.lock /beetle_maps/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

ADD . /beetle_maps
