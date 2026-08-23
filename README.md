# LifeOS — Static Working Prototype

A frontend-only LifeOS prototype based on the supplied UI reference. No backend, database, login, or API is required.

## Features
- Home dashboard
- Quick access: Documents, Medicines, Expenses, Reminders, Home Inventory, Bills
- Home inventory: add/delete/search-ready data
- Medicines: mark doses taken
- Bills & subscriptions
- Expenses: add expenses
- Reminders
- Local AI-assistant-style screen with demo responses
- Search across local data
- Profile/reset demo data
- Data persists in browser localStorage
- Responsive mobile-first design

## Run locally
```bash
npm install
npm run dev
```

## Build for deployment
```bash
npm run build
```
Upload the generated `dist` folder to any static host such as Netlify, Vercel, GitHub Pages, Firebase Hosting, or an Nginx/static server.
