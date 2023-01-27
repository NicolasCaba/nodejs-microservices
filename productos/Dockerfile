FROM node:18-alpine

RUN npm install -g typescript

WORKDIR /usr/src/app/productos

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]