FROM node:8.6.0-wheezy
RUN apt-get update -qq && apt-get install -y zip
WORKDIR /cli
RUN npm install
RUN npm install -g pkg
