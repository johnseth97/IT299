FROM node:20-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
