# Sania Ismail | AI, Machine Learning & Data Analytics Solutions

Premium AI/ML/bioinformatics consulting website — React + Vite + TypeScript +
Tailwind CSS frontend, FastAPI + PostgreSQL backend.

## Status: Day 7 — Testing & Deployment ✅ (Days 1–6 ✅ included)

The full 7-day build is complete:

- **Days 1–3**: project skeleton, routing, dark/light mode, Home/About pages
  built from Sania's real CV, full Services (37 services) and Projects (10
  case studies) pages with search/filtering
- **Day 4**: Contact page + full multi-step Order system (file upload, email
  notifications, PostgreSQL storage)
- **Day 5**: JWT-secured Admin Dashboard — KPIs, order status management, CSV
  export, messages inbox, content managers, settings
- **Day 6**: Blog (Markdown-rendered, seeded with 3 posts), FAQ search, public
  Testimonials (live from the database), Pricing tiers, SEO meta tags,
  `robots.txt`/`sitemap.xml`, page transitions
- **Day 7**: Alembic migrations (replacing dev-only table creation), Docker
  support, Render + Vercel deployment configs, this README

Every day of this build was tested against a live running server before being
delivered — not just written and assumed to work. See the Verification
Checklist at the bottom for what to re-check yourself.

## Quick Start (local development)

### 1. Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # fill in DATABASE_URL, SMTP, Cloudinary, ADMIN_USERNAME/PASSWORD
alembic upgrade head   # creates all tables
uvicorn app.main:app --reload
```
Visit http://localhost:8000/health → `{"status": "healthy"}`.
Visit http://localhost:8000/docs for the full interactive API reference.

The first time the backend starts, it automatically:
- Creates an admin account from `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- Seeds 3 starter blog posts and 3 starter testimonials

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL, defaults to http://localhost:8000/api/v1
npm run dev
```
Visit http://localhost:5173.

Log in to the admin panel at http://localhost:5173/admin/login with the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` from your backend `.env`.

### Alternative: Docker Compose (backend + real Postgres)

```bash
docker compose up --build
```
This runs a real PostgreSQL container plus the backend (migrations run
automatically on container start). Run the frontend separately with
`npm run dev` as above, pointing `VITE_API_URL` at `http://localhost:8000/api/v1`.

> Note: the Dockerfile and docker-compose.yml were written and reviewed
> carefully but not build-tested in this environment (no Docker daemon was
> available here) — please run `docker compose up --build` yourself as your
> first check before deploying.

## Database migrations (Alembic)

Schema changes are managed by Alembic, not automatic table creation.

```bash
cd backend
alembic upgrade head                              # apply all migrations
alembic revision --autogenerate -m "description"  # after changing a model
```
The included initial migration (`alembic/versions/..._initial_schema.py`) was
generated and tested against a real SQLite database — it correctly creates
all 7 tables (admins, orders, messages, projects, services, testimonials, blogs).

## Deployment

### Frontend → Vercel
`frontend/vercel.json` is included (Vite framework preset, SPA rewrite so
client-side routes don't 404 on refresh). Set the environment variable
`VITE_API_URL` to your deployed backend's URL + `/api/v1`.

### Backend → Render
`render.yaml` is included as a Render Blueprint. It runs `alembic upgrade
head` before starting Uvicorn. You'll need to set these env vars in the
Render dashboard (marked `sync: false` in the blueprint, meaning Render won't
auto-fill them):
`DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SMTP_USER`,
`SMTP_PASSWORD`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
`CLOUDINARY_API_SECRET`, `FRONTEND_ORIGIN` (your live Vercel URL).

### Database → Neon
Create a Neon Postgres project, copy its connection string into
`DATABASE_URL` (both locally and on Render), then run `alembic upgrade head`
once against it before your first deploy.

## Environment variables

See `backend/.env.example` and `frontend/.env.example` for the full lists.

Backend: `DATABASE_URL`, `SECRET_KEY`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`,
`SMTP_HOST/PORT/USER/PASSWORD`, `ADMIN_EMAIL`, `CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET`,
`FRONTEND_ORIGIN`.
Frontend: `VITE_API_URL`.

## Tech stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, React Router,
  Framer Motion, React Icons, Axios, Chart.js, marked + DOMPurify
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, Alembic, JWT auth (python-jose
  + bcrypt), SMTP email, Cloudinary
- **Deployment**: Vercel (frontend), Render (backend), Neon (database), Docker
  (local Postgres via docker-compose)

## Screenshots

_Add screenshots here before publishing — a home page hero shot, the admin
dashboard, and a project detail page work well:_

```markdown
![Home page](./screenshots/home.png)
![Admin dashboard](./screenshots/admin-dashboard.png)
![Project detail](./screenshots/project-detail.png)
```

## Demo video script (2–3 minutes, for portfolio/LinkedIn)

1. **(0:00–0:20)** Hero section — mention your name, roles, and that this is
   a full-stack build (React + FastAPI + PostgreSQL), not a template.
2. **(0:20–0:50)** Scroll through Home → About → Services → Projects. Click
   into one project's case study page.
3. **(0:50–1:20)** Show the Order flow: pick a service, fill the 3-step form,
   submit, show the generated Order ID.
4. **(1:20–1:50)** Log into `/admin`, show the dashboard chart, then flip that
   same order's status in the Orders table.
5. **(1:50–2:20)** Show the Blog with a real Markdown post rendered, and the
   FAQ search.
6. **(2:20–2:45)** Toggle dark/light mode, then resize the browser to show
   mobile responsiveness.
7. **(2:45–3:00)** Close on the live deployed URL and your contact info.

## Verification Checklist (re-run before considering this "done")

- [ ] `alembic upgrade head` runs clean against your real Postgres/Neon database
- [ ] Backend starts with no errors, `/health` returns healthy
- [ ] Frontend `npm run build` completes with no errors
- [ ] Every nav link and footer link loads without a 404
- [ ] Order form: submit end-to-end, confirm the order appears in `/admin/orders`
- [ ] Contact form: submit, confirm it appears in `/admin/messages`
- [ ] Admin login works with your real `.env` credentials; wrong password is rejected
- [ ] Change an order's status in the admin table, refresh, confirm it stuck
- [ ] Export CSV downloads a real file with your test orders in it
- [ ] `/blog` shows 3 seeded posts; opening one renders Markdown correctly
- [ ] `/testimonials` shows the 3 seeded testimonials
- [ ] Dark/light toggle works across every page, not just Home
- [ ] Resize to mobile width — navbar collapses to hamburger, no horizontal scroll
- [ ] Once deployed: confirm CORS works (frontend can actually reach the live backend — check the browser console for CORS errors)
- [ ] Once deployed: send a real test order/message and confirm you actually receive the SMTP emails
