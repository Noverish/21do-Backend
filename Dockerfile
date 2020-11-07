FROM node:14.15.0-alpine

RUN apk add --no-cache tzdata
ENV TZ='Asia/Seoul'

WORKDIR /app

COPY . /app

ENTRYPOINT npm start