FROM node:18-alpine

RUN npm install -g typescript

WORKDIR /usr/src/app/ventas

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3003

CMD [ "npm", "start" ]