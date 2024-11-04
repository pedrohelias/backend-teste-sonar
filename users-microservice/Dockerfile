FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY .env.docker .env

COPY . .