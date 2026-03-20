FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev --silent --no-fund
COPY . .
CMD ["node", "index.js"]