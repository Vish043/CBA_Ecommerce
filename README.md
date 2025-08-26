# Amazon (GRP Project for CBA India Internship)

This is a full-stack e-commerce clone project built as a group (GRP) project for the CBA India Internship.

## Structure
- `backend/` — Node.js/Express API (no MongoDB required for mock/demo mode)
- `frontend/` — React app (connects to backend via proxy)

## Quick Start (Windows)
1. Clone/download this repo.
2. Run the provided PowerShell script:

```powershell
./start-all.ps1
```

This will open two terminals: one for the backend (http://localhost:5000), one for the frontend (http://localhost:3000).

## Manual Start
- Backend:
  ```powershell
  cd backend
  npm install
  node server.js
  ```
- Frontend:
  ```powershell
  cd frontend
  npm install
  npm start
  ```

## Notes
- If you want to use a real MongoDB, set `MONGO_URL` in `backend/.env` and restart the backend.
- For demo/mock mode, no database is required.

---
**Project for CBA India Internship (GRP)**
