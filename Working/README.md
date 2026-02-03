# Drinkin’ — Coffee Pouch Brand

Modern full‑stack website for Drinkin’, Bangladesh’s first coffee pouch brand.

## Overview
- Frontend: Vite + React (responsive, modern UI)
- Backend: Node.js + Express.js
- DB: MongoDB Atlas (Mongoose)
- Auth: JWT (customer + admin)
- Admin: `/admin` route inside frontend (JWT‑guarded)

Place the provided images in frontend public:
- `frontend/public/logo.jpg` (logo from attachment)
- `frontend/public/info.png` (how to drink graphic)

---

## Folder Structure
```
Coffe Shop/
  backend/
    src/
      config/db.js
      controllers/
      middleware/
      models/ (User, Product, Order)
      routes/ (auth, products, orders)
      utils/seed.js
    .env.example
    package.json
    server.js
  frontend/
    public/ (logo.jpg, info.png)
    src/
      components/
      context/ (AuthContext, CartContext)
      pages/ (Home, Shop, About, Auth, Cart, Orders, Admin/*)
      App.jsx, main.jsx, styles.css
    .env.example
    package.json
    vite.config.js
```

---

## MongoDB Schemas
- User: `{ name, email, password (hashed), isAdmin }`
- Product: `{ name, description, price, imageUrl, isActive }`
- Order: `{ user, items[{ product, name, price, qty }], total, status }`

---

## API Endpoints
Base URL: `http://localhost:5000`

Auth
- POST `/api/auth/register` → create user, returns JWT
- POST `/api/auth/login` → login, returns JWT
- GET `/api/auth/me` (Bearer) → profile

Products
- GET `/api/products` → list active products
- POST `/api/products` (Admin) → create product `{ name, description, price, imageUrl, isActive? }`
- PUT `/api/products/:id` (Admin) → update
- DELETE `/api/products/:id` (Admin) → remove

Orders
- POST `/api/orders` (Auth) → place order `{ items:[{ product, qty }] }`
- GET `/api/orders/my` (Auth) → current user orders
- GET `/api/orders` (Admin) → all orders
- PUT `/api/orders/:id/status` (Admin) → update status to `Pending|Preparing|Completed`

---

## Local Development

### One-command setup & run (recommended)

From the project root:

```bash
cd "Coffe Shop"        # project folder
npm run install:all     # install backend + frontend deps
npm run dev             # start API (5000) + Vite (5173)
```

Then open: http://localhost:5173

---

### Manual setup

1) Backend
```bash
cd backend
copy .env.example .env  # or create .env
npm install
npm run dev  # nodemon on :5000
```
Set `.env`:
```
PORT=5000
MONGO_URI=tour atlas url
JWT_SECRET=change_me
CLIENT_ORIGIN=http://localhost:5173
```
Seed demo data (products + default admin `admin@drinkin.global` / `pass`):
```bash
npm run seed
```

2) Frontend
```bash
cd ../frontend
copy .env.example .env
npm install
npm run dev  # Vite on :5173
```
If backend runs elsewhere, set `VITE_API_BASE_URL` in `frontend/.env`.

---

## Deployment

Render (Backend)
- New Web Service → Connect GitHub `drinkin-backend` repo
- Build Command: `npm install`
- Start Command: `node server.js`
- Environment:
  - `PORT`: 10000 (Render auto)
  - `MONGO_URI`: your Atlas URI
  - `JWT_SECRET`: strong secret
  - `CLIENT_ORIGIN`: `https://<netlify-site>.netlify.app`
- Add `Allow CORS` origin in `.env` (comma‑separate multiple origins).

Netlify (Frontend)
- New site from Git → connect `drinkin-frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Env var: `VITE_API_BASE_URL=https://<render-app>.onrender.com`

---

## Admin Panel
- Login as admin, then open `/admin`
- Manage products (add/update/delete), orders (status), customers (grouped by email)
- Product images are URL‑based (no hosting required)

---

## GitHub Repos (suggested)
Create two repositories and push from each folder:
```bash
# Backend
cd backend
git init
git add .
git commit -m "feat(api): bootstrap express, models, routes"
# Add remote then push

# Frontend
cd ../frontend
git init
git add .
git commit -m "feat(ui): bootstrap react app with pages and admin"
# Add remote then push
```

---

## Notes
- Auth uses JWT in `Authorization: Bearer <token>` header
- Orders require login; admin features require `isAdmin=true`
- Error handling with consistent JSON responses
- CORS origins are controlled with `CLIENT_ORIGIN`
