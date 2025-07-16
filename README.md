# 📸 Photo Order Web App – IT299 Capstone

## A full-stack web application for ordering photography services online.

### Developed as the final product for the IT299 Integrative Project at Purdue Global

---

## Table of Contents
- [Purpose](#-purpose)
- [Tech Stack](#-tech-stack)
- [Live Demo](#live-demo)
- [Features](#features)
- [Getting Started (For Developers)](#getting-started-for-developers)
- [Project Structure from Root](#project-structure-from-root)
- [Author](#author)
- [License](#license)

---

## 🎯 Purpose

This app allows customers to:

- Select photography services (e.g., prints, edits, film scans)
- Add them to a cart
- Upload corresponding photos
- Submit and retrieve orders by email or order ID — no login required

Designed to streamline operations for Picture This Photography, improve customer satisfaction, and increase stakeholder value.

---

## ⚙️ Tech Stack

| Layer        | Technology                           |
|-------------|----------------------------------------|
| Frontend     | React + TypeScript + Vite + Express   |
| Backend      | Node.js + Express + TypeScript        |
| Database     | SQLite (non-persistent for demo use)  |
| Styling / UI | shadcn/ui components                  |
| Uploads      | Local base64 image storage            |
| DevOps       | Docker + Docker Compose               |
| CI/CD        | GitHub Actions                        |
| Hosting      | Azure Container Apps (Simulated AAS)  |

---

## Live Demo

🟢 **URL:**  
`https://it299-frontend-app.graydune-3d57e178.eastus.azurecontainerapps.io`

**Access:**  

- Github login required, as simple DDOS precaution.
- Container App set to auto-scale down to 0 instances when idle.
- - If the app is slow to load, it may be scaling up from 0.
- - Please wait 30-60 seconds and refresh.
- - Same for first call to the backend API.
- To test order flow:
- - add a service to the cart →
- - upload photos → submit →
- - check orders by email

---

## Features

- **Cart-based Ordering** with image upload dialogs and undo options
- **Email-based Order Lookup** (no account needed)
- **Real-time Upload Preview** using base64 thumbnails
- **Service Browser** from live API data (`/api/service-types`)
- **CI/CD Pipeline** with semantic versioning and Docker image release
- **Azure deployment** with simulated enterprise conditions

---

## Getting Started (For Developers)

### Local Production Setup

```bash
git clone https://github.com/johnseth97/IT299
cd IT299

# Local Production Compose (Docker)
docker-compose -f docker-compose.yml up --build

# Local Production native
cd Backend && npm install && npm run dev
cd Frontend && npm install && npm run dev

# Local Development using Vite (From Root)
npm i && npm run dev

```

All local builds use .env files in /Frontend and /Backend for local configuration.

---

## Project Structure from Root

```sh
/Frontend     # React + Vite app (client UI)
/Backend      # Express + SQLite backend (REST API)
/.github      # GitHub Actions workflows
Dockerfile.*  # Container builds
docker-compose.yml # Docker Compose for local production
```

---

## Author

```markdown
Ethan Johnson
IT299 – Purdue Global, Summer 2025
All code original unless otherwise noted.
```

---

## License

***Academic use only. For IT299 evaluation and demonstration purposes.***
