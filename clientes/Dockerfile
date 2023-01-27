FROM node:18-alpine

RUN npm install -g typescript

WORKDIR /usr/src/app/clientes

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3002

CMD [ "npm", "start" ]