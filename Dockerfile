FROM node:14.9.0-alpine

RUN apk add --no-cache tzdata
ENV TZ='Asia/Seoul'

WORKDIR /app

COPY . /app

ENTRYPOINT npm start