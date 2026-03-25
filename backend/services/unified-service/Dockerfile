FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5007

CMD ["node", "--dns-result-order=ipv4first", "server.js"]
