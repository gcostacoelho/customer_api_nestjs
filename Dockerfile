FROM node:18.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

EXPOSE 3000

COPY . .

CMD npm run build && npm run start:prod