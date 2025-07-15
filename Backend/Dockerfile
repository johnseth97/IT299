FROM node:20-slim

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy only Backend project and root workspace files
COPY ./Backend /app
COPY ./package*.json ./

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "dev"]
