# Backend Dockerfile
FROM node:20-slim

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install only backend dependencies
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
