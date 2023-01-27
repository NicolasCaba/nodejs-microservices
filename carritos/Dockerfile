FROM node:18-alpine

RUN npm install -g typescript

WORKDIR /usr/src/app/carritos

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]