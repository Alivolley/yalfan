FROM node:20.11-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]