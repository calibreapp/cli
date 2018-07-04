FROM node:8.6.0-wheezy
RUN apt-get update -qq && apt-get install -y zip

# Copy to /cli
RUN mkdir /cli
WORKDIR /cli
COPY package.json package-lock.json /cli/
RUN npm i
RUN npm link pkg

COPY . /cli
