# Project Overview

## This project is a ful- tack web application designed to allow users to order photographs online through a shopping cart interface. It is built using modern web technologies and structured for containerized deployment.

## Tech Stack

- Frontend: React + Vite (TypeScript)
- Backend: Node.js (TypeScript, Express)
- Database: SQLite (no-persistent, for academic purposes)
- Containerization: Docker + Docker Compose
- CI/CD & Deployment: GitHub Actions → Azure Container Apps (simulated)

⸻

## System Architecture

The application follows a decoupled architecture:

- Frontend handles user interaction, cart management, and communicates with the backend via REST APIs.
- Backend provides REST endpoints for image browsing, cart management, order submission, and payment confirmation.
- Database stores order data, image metadata, and temporary cart sessions.

### All components run in isolated containers defined by a docke- ompose.yml file.

⸻

## Component Design

```
[ React Frontend ]
    ↕  REST API (JSON over HTTPS)
[ Node/Express Backend ]
    ↕
[ SQLite Database ]
```

- Frontend and backend are containerized separately.
- API calls flow through port- xposed backend container.

⸻

## API Contracts

Example endpoints:

```
Method | Endpoint      | Description
GET    | /api/photos   | Retrieve available photos
POST   | /api/cart     | Add item to cart
GET    | /api/cart     | Retrieve current cart contents
POST   | /api/order    | Finalize and place an order
POST   | /api/payments | Simulate payment confirmation
```

### All requests return JSON responses and follow REST conventions

⸻

## Frontend UX

The frontend will consist of:

- Gallery View: Browse available photos
- Cart View: View and modify selected items
- Checkout View: Confirm and submit orders
- Confirmation View: Show final success screen

### Navigation is handled with React Router

⸻

## Backend Endpoint Design

The backend is designed using Express with the following:

- Route structure: api/- refixed REST endpoints
- Middleware: JSON body parsing, simple auth token parsing, logging
- Services: In- emory and SQLite-backed logic for cart/order/payment flows

⸻

## Authentication

For the purposes of this project:

- No external login is implemented
- Auth system is simulated with pre- et session tokens or placeholder fields
- A future extension could use Azure Easy Auth or OAuth providers like GitHub/Google

⸻

## Database Schema

The SQLite schema includes:

- photos(id, title, url)
- cart(id, photo_id, quantity)
- orders(id, user_id, total, created_at)
- order_items(id, order_id, photo_id, quantity)

This schema supports basic cart and order tracking logic.

⸻

## Docker Setup

- The frontend and backend each has its own Dockerfile
- A docker-compose.yml file defines shared network, volume mounts, build strategy
- A docker-compose.override.yml file defines the overrides for the dev environment
- Backend exposes port 5000; frontend port 3000
- .env files used for environment config

⸻

## Deployment (Simulated)

- GitHub Actions pipeline builds containers and push (in real deployment)
- Simulated deployment to Azure Container Apps using mock step in CI
- CI pipeline includes lint/test/build steps for both frontend and backend

⸻
