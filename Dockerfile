FROM ruby:3.1.2

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && apt-get install -y nodejs

# install yarn
RUN npm install --global yarn

# RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y postgresql-client --no-install-recommends && rm -rf /var/lib/apt/lists/*
# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs 
# RUN apt-get update && apt-get install -y yarn

WORKDIR /beetle_maps

ADD Gemfile /beetle_maps/Gemfile
ADD Gemfile.lock /beetle_maps/Gemfile.lock

RUN gem install bundler
RUN bundle install

ADD . /beetle_maps
