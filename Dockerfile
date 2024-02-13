FROM ruby:3.1.2


RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# nodejsをインストール
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs


# yarnをnpmでインストール
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
