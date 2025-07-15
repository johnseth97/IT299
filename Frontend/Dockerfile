# Frontend/Dockerfile
FROM node:20-slim

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy root monorepo files and workspace
COPY ../../package*.json ../../pnpm-workspace.yaml* ./
COPY ../../Frontend ./Frontend

# Install only dependencies for frontend using workspace filtering
RUN npm install --workspace Frontend

WORKDIR /app/Frontend

EXPOSE 3000
CMD ["npm", "run", "dev"]
