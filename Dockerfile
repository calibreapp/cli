FROM node:alpine
RUN apk add zip bash

# Copy to /cli
RUN mkdir /cli
WORKDIR /cli
COPY package.json package-lock.json /cli/
RUN npm install

COPY . /cli
