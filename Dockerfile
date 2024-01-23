FROM node:20.11-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]