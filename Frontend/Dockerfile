# Frontend Dockerfile
FROM node:20-slim

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
