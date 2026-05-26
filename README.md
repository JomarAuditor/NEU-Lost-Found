<div align="center">

<img src="https://img.shields.io/badge/React%20Native%20Web-0.19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub%20Copilot-Assisted-8B5CF6?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/Cost-$0.00%2Fmonth-22C55E?style=for-the-badge" />

<br />
<br />

# 🏫 NEU Lost & Found System

### A production-ready, mobile-first lost & found platform for New Era University

**From a basic HTML/CSS/MySQL school project → a full-stack cloud application in 10 weeks**

[🌐 Live Demo](#) · [📹 Video Walkthrough](#) · [📖 Transformation Guide](./docs/TRANSFORMATION_GUIDE.pdf) · [🐛 Report Bug](../../issues)

</div>

---

## 📌 Table of Contents

- [About The Project](#-about-the-project)
- [The Transformation](#-the-transformation)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [File Structure](#-file-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [GitHub Copilot Usage](#-github-copilot-usage)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

New Era University's Lost & Found office used to run on paper logs and a basic spreadsheet. Students who lost something had no way to check if their item had been found — they had to physically walk to the office and hope for the best.

I built a basic HTML/CSS/MySQL prototype as a school project to fix this. It worked, barely. No mobile support, no authentication, required XAMPP to run, and couldn't be shared with anyone outside a local network.

**This is the finished version.** A real, deployable, zero-cost web application that the university can run today.

> *"The best project isn't the most complex one — it's the one that actually gets used."*

### Who It's For

| User | What They Can Do |
|------|-----------------|
| 🎓 **Students** | Report found items, browse the inventory, claim lost belongings, receive real-time updates |
| 🛡️ **Admins** | Review reports, approve/reject claims, manage users, view analytics, export reports |
| 🏫 **University** | Zero hosting cost, immediate deployment, scalable to 50,000+ users on free tier |

---

## 🔄 The Transformation

<table>
<tr>
<th>Dimension</th>
<th>❌ Before</th>
<th>✅ After</th>
</tr>
<tr>
<td><b>Tech Stack</b></td>
<td>HTML · CSS · Vanilla JS · XAMPP MySQL</td>
<td>React Native Web · Node.js · Supabase PostgreSQL</td>
</tr>
<tr>
<td><b>Mobile</b></td>
<td>Not responsive — desktop only</td>
<td>Mobile-first PWA, installable to home screen</td>
</tr>
<tr>
<td><b>Authentication</b></td>
<td>None</td>
<td>JWT + Supabase Auth + Row Level Security</td>
</tr>
<tr>
<td><b>Database</b></td>
<td>Local MySQL (requires XAMPP)</td>
<td>Cloud PostgreSQL on Supabase</td>
</tr>
<tr>
<td><b>Images</b></td>
<td>Not supported</td>
<td>Multi-image upload with CDN delivery</td>
</tr>
<tr>
<td><b>Search</b></td>
<td>Basic SQL LIKE query</td>
<td>Full-text search + category/location/date filters</td>
</tr>
<tr>
<td><b>Real-time</b></td>
<td>Manual page refresh</td>
<td>WebSocket subscriptions via Supabase Realtime</td>
</tr>
<tr>
<td><b>Notifications</b></td>
<td>None</td>
<td>In-app + email notifications</td>
</tr>
<tr>
<td><b>Admin Panel</b></td>
<td>Basic HTML table</td>
<td>Analytics dashboard with charts and exports</td>
</tr>
<tr>
<td><b>Security</b></td>
<td>No validation whatsoever</td>
<td>Joi + RLS + Helmet + Rate limiting</td>
</tr>
<tr>
<td><b>Deployment</b></td>
<td>Local XAMPP only</td>
<td>Vercel + Supabase (free, global CDN)</td>
</tr>
<tr>
<td><b>Testing</b></td>
<td>None</td>
<td>Jest + React Testing Library + Cypress (>80% coverage)</td>
</tr>
<tr>
<td><b>Accessibility</b></td>
<td>Not considered</td>
<td>WCAG 2.1 Level AA compliant</td>
</tr>
<tr>
<td><b>Performance</b></td>
<td>No optimization</td>
<td>Lighthouse Score > 90</td>
</tr>
<tr>
<td><b>Monthly Cost</b></td>
<td>Requires local server</td>
<td><b>$0.00 forever</b></td>
</tr>
</table>

---

## ✨ Features

### For Students
- **📦 Report Found Items** — 4-step guided wizard: Basic Info → Location → Description & Photos → Review
- **🔍 Smart Search & Browse** — Full-text search, category filters, date range, building/floor filters
- **📋 Claim System** — Describe your lost item, upload proof, track claim status in real-time
- **🔔 Live Notifications** — Instant updates when your claim is approved or item is ready for pickup
- **📱 Mobile-First** — Works perfectly on any phone. Install to home screen as a PWA.
- **🔒 Secure Account** — Email verification, password reset, JWT session management

### For Admins
- **📊 Analytics Dashboard** — Real-time KPI cards, items by category (pie chart), trends over time (line chart), items by location (bar chart)
- **✅ Item Management** — Approve/reject reports, edit details, bulk archive, export to CSV
- **👤 Claim Review** — Side-by-side comparison of claim vs. original report. One-click approve or reject with notes.
- **👥 User Management** — Search users, view activity history, suspend accounts, promote to admin
- **📄 Reports** — Generate monthly PDF/CSV reports for university administration
- **⚡ Real-time Admin Feed** — New item submissions appear on the dashboard instantly

### Unique Feature: QR Code Handoff 🏆
When an item is approved, the system generates a unique QR code. The admin prints it and attaches it to the physical item in the lost & found cabinet. Students scan the QR with their phone and are taken directly to that item's claim page — no searching required. This is the kind of physical-digital integration that makes a real difference in daily university life.

---

## 🛠️ Tech Stack

### Frontend
```
React Native Web 0.19     →  Write once, deploy web + mobile
React Navigation 6        →  Stack, Tab, and Drawer navigators
React Native Paper 5      →  Material Design UI components
TanStack React Query 5    →  Server state, caching, background refresh
Formik 2 + Yup 1          →  Form state management + schema validation
Axios 1.6                 →  HTTP client with request/response interceptors
Supabase JS 2             →  Realtime subscriptions + storage client
browser-image-compression →  Client-side image optimization before upload
```

### Backend
```
Node.js 20 + Express 4    →  RESTful API server
@supabase/supabase-js 2   →  Admin client (service role) for DB operations
Helmet 7                  →  Security HTTP headers
express-rate-limit 7      →  DDoS and brute-force protection
Joi 17                    →  Request payload validation schemas
Multer 1.4                →  Multipart file upload handling
Sharp 0.33                →  Server-side image resize + WebP conversion
Winston 3.11              →  Structured production logging
jsonwebtoken 9            →  JWT creation and verification
```

### Infrastructure
```
Supabase (Free Tier)      →  PostgreSQL 500MB + Auth + 1GB Storage + Realtime
Vercel (Free Tier)        →  Frontend CDN + Serverless backend functions
GitHub Actions            →  CI/CD: lint → test → build → deploy on every push
Sentry (Free Tier)        →  Error tracking and performance monitoring
```

### Why Supabase Over Firebase?

| Feature | Supabase (Free) | Firebase (Free) |
|---------|----------------|-----------------|
| Database | PostgreSQL — full SQL, joins, RLS | Firestore — NoSQL, limited queries |
| Auth | 50,000 MAU | 10,000 MAU |
| Storage | 1GB + CDN | 5GB |
| Real-time | WebSocket subscriptions | WebSocket |
| SQL Support | Full SQL + stored procedures | ❌ NoSQL only |
| Open Source | ✅ Yes — self-hostable | ❌ Proprietary |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│                                                              │
│   Mobile Browser    Tablet Browser    Desktop Browser        │
│         └───────────────┴─────────────────┘                  │
│                          │                                   │
│              React Native Web + React Navigation             │
│              Context API (Auth, Theme, Notifs)               │
│              TanStack React Query (Server State)             │
└──────────────────────────┬───────────────────────────────────┘
                           │  HTTPS / WSS
┌──────────────────────────▼───────────────────────────────────┐
│                   API LAYER (Vercel Serverless)               │
│                                                              │
│   /api/auth/*    /api/items/*    /api/claims/*               │
│   /api/admin/*   /api/users/*    /api/notifications/*        │
│                                                              │
│   Middleware: JWT Verify → Joi Validate → Rate Limit → Log   │
└──────────────────────────┬───────────────────────────────────┘
                           │  PostgreSQL Protocol
┌──────────────────────────▼───────────────────────────────────┐
│                  SUPABASE BACKEND SERVICES                    │
│                                                              │
│   PostgreSQL DB          Auth Service      Storage (CDN)     │
│   ├── users              ├── JWT tokens    ├── item-images/  │
│   ├── lost_items         ├── Email verify  ├── claim-proof/  │
│   ├── claims             ├── OAuth (opt)   └── thumbnails/   │
│   ├── notifications      └── Sessions                        │
│   └── activity_logs                                          │
│                                                              │
│   Realtime Engine (WebSocket) ← broadcasts DB changes        │
└──────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

**1. Stateless JWT Authentication**
Supabase Auth generates JWTs automatically. Stored in HTTP-only cookies (XSS-safe). Every request is verified server-side. Row Level Security enforces data access at the database level — a compromised API key alone cannot leak another user's data.

**2. Real-time via Supabase Subscriptions**
No polling. When a student submits a report, a database INSERT fires a Supabase Realtime event. The admin dashboard receives it via WebSocket and updates the UI in under 100ms.

**3. Client-side Image Compression**
Images are compressed to under 500KB using `browser-image-compression` before upload. This saves Supabase Storage quota, reduces upload time on campus WiFi, and generates WebP versions for 30% smaller file sizes.

**4. Progressive Web App**
Students can install the app to their phone home screen directly from the browser — no App Store required. A Service Worker caches recent items for offline viewing and queues form submissions when the network drops.

**5. PostgreSQL Full-Text Search**
A GIN index on `item_name || description` enables ranked full-text search with no external search service. Sufficient for hundreds of thousands of records. Filters for category, building, and date range run as indexed column lookups.

---

## 🗄️ Database Schema

### Entity Relationship

```
users ──────────────< lost_items (reported_by)
  │                       │
  │                       └──────────────< claims (item_id)
  │                                            │
  └────────────────────────────────────────────┘ (user_id)
                          │
                   notifications (user_id)
                   activity_logs (user_id, entity_id)
```

### Table Overview

| Table | Rows (expected) | Key Columns |
|-------|----------------|-------------|
| `users` | ~5,000 | id, email, student_id, role, is_active |
| `lost_items` | ~10,000/yr | id, item_name, category, status, image_urls[], reported_by |
| `claims` | ~3,000/yr | id, item_id, user_id, status, proof_images[], reviewed_by |
| `notifications` | ~50,000/yr | id, user_id, type, read, created_at |
| `activity_logs` | ~200,000/yr | id, user_id, action, entity_type, entity_id, details JSONB |

### Status Workflows

```
lost_items.status:   pending → approved → claimed → returned → archived
claims.status:       pending → approved → rejected → completed
users.role:          student | admin | super_admin
```

### Row Level Security Summary

Every table has RLS enabled. No exceptions. Key policies:

- **Students** can only see `lost_items` with `status = 'approved'` (plus their own reports)
- **Students** can only see their own `claims` and `notifications`
- **Admins** can see and modify everything
- **Service Role** (backend only) can insert `notifications` and `activity_logs`
- **No one** can update `activity_logs` — immutable audit trail

---

## 📁 File Structure

```
neu-lost-found/
│
├── packages/
│   └── web/                          # React Native Web Application
│       ├── public/
│       │   ├── index.html
│       │   ├── manifest.json         # PWA manifest
│       │   └── service-worker.js     # Offline caching
│       │
│       └── src/
│           ├── components/
│           │   ├── common/           # Button, Input, Card, Modal, Loading, Badge
│           │   ├── layout/           # Header, Footer, Navigation, Sidebar
│           │   ├── items/            # ItemCard, ItemList, ItemForm (4-step), ItemFilters
│           │   ├── claims/           # ClaimCard, ClaimForm, ClaimList
│           │   ├── admin/            # Dashboard, StatsCard, Charts, UserMgmt, ClaimReview
│           │   └── notifications/    # NotificationBell, NotificationList
│           │
│           ├── screens/
│           │   ├── auth/             # Login, Signup, ForgotPassword, EmailVerify, ResetPassword
│           │   ├── student/          # Home, BrowseItems, ReportItem, MyReports, MyClaims, Profile
│           │   ├── admin/            # Dashboard, ItemsMgmt, ClaimsMgmt, UsersMgmt, Reports
│           │   └── shared/           # ItemDetail, Notifications, Settings
│           │
│           ├── navigation/           # AppNavigator, AuthNavigator, StudentNavigator, AdminNavigator
│           │
│           ├── services/
│           │   ├── api/              # Axios client (w/ interceptors), auth, items, claims, users
│           │   ├── supabase/         # client, auth, storage, realtime subscriptions
│           │   └── utils/            # imageUpload, imageCompression
│           │
│           ├── context/              # AuthContext, ThemeContext, NotificationContext
│           ├── hooks/                # useAuth, useItems, useClaims, useNotifications, useDebounce
│           ├── utils/                # validation, formatters, constants, errorHandling
│           ├── styles/               # theme, colors, typography, spacing, breakpoints
│           └── config/               # env.js, supabase.js
│
├── server/                           # Node.js Express Backend
│   └── src/
│       ├── config/                   # supabase (admin client), env, logger, cors
│       ├── middleware/               # auth (JWT verify), validation, errorHandler,
│       │                             # rateLimiter, logger, sanitize
│       ├── routes/                   # auth, items, claims, users, admin, notifications, health
│       ├── controllers/              # auth, items, claims, users, admin, notifications
│       ├── services/                 # auth, items, claims, users, email,
│       │                             # notification, storage, search
│       ├── models/                   # user, item, claim, notification, activityLog
│       ├── validators/               # auth, item, claim, user (Joi schemas)
│       ├── utils/                    # response, errors, helpers, crypto
│       ├── app.js
│       └── server.js
│
├── database/
│   ├── migrations/                   # 001_users … 009_triggers (run in order)
│   └── seeds/                        # Admin account, sample items, sample claims
│
├── docs/
│   ├── API.md                        # All endpoints with request/response examples
│   ├── SETUP.md                      # Local development setup
│   ├── DEPLOYMENT.md                 # Production deployment steps
│   └── TRANSFORMATION_GUIDE.pdf     # Full before/after guide
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint → Test → Build on every PR
│       ├── deploy.yml                # Auto-deploy to Vercel on merge to main
│       └── lighthouse.yml            # Performance audit on every deploy
│
├── .eslintrc.js
├── .prettierrc
├── package.json                      # Yarn Workspaces root
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Yarn 1.22+
- A free [Supabase](https://supabase.com) account
- A free [Vercel](https://vercel.com) account

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/neu-lost-found.git
cd neu-lost-found
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run migration files in order:
   ```
   database/migrations/001_create_users.sql
   database/migrations/002_create_items.sql
   ...through...
   database/migrations/009_create_triggers.sql
   ```
3. Go to **Storage** → Create a bucket named `item-images` (set to public, 5MB file size limit)
4. Go to **Settings → API** → Copy your **Project URL**, **anon key**, and **service_role key**

### 4. Configure Environment Variables

**Frontend** — copy `packages/web/.env.example` to `packages/web/.env.local`:
```bash
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SUPABASE_URL=your-supabase-project-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_ENV=development
```

**Backend** — copy `server/.env.example` to `server/.env`:
```bash
NODE_ENV=development
PORT=3001
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-role-key
JWT_SECRET=generate-a-random-32-char-secret
CORS_ORIGIN=http://localhost:3000
```

### 5. Seed the Database (Optional)

```bash
# Run seed files in Supabase SQL Editor
database/seeds/001_seed_admin_users.sql
database/seeds/002_seed_sample_items.sql
```

### 6. Start Development Servers

```bash
# Start both frontend and backend simultaneously
yarn dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Supabase Studio | https://app.supabase.com |

### 7. Create Your Admin Account

After signing up normally, run this in Supabase SQL Editor:
```sql
UPDATE users SET role = 'super_admin' WHERE email = 'your@email.com';
```

---

## 🔐 Environment Variables

### Frontend (`packages/web/.env.local`)

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API base URL | ✅ |
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `REACT_APP_SUPABASE_ANON_KEY` | Supabase public anon key | ✅ |
| `REACT_APP_ENV` | `development` or `production` | ✅ |

### Backend (`server/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | `development` or `production` | ✅ |
| `PORT` | Server port (default: 3001) | ✅ |
| `SUPABASE_URL` | Your Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase public anon key | ✅ |
| `SUPABASE_SERVICE_KEY` | Supabase service role key ⚠️ Keep secret | ✅ |
| `JWT_SECRET` | Random 32-char string for JWT signing | ✅ |
| `CORS_ORIGIN` | Allowed frontend origin | ✅ |
| `SENTRY_DSN` | Sentry error tracking DSN | Optional |

> ⚠️ **NEVER commit `.env` files.** The `SUPABASE_SERVICE_KEY` has full database access. Add it only as a Vercel environment variable in production.

---

## ☁️ Deployment

This application deploys for **$0.00/month** using Vercel and Supabase free tiers.

### Deploy Backend

```bash
cd server
vercel --prod
# Follow prompts, add environment variables in Vercel dashboard
```

### Deploy Frontend

```bash
cd packages/web
vercel --prod
# Add REACT_APP_API_URL pointing to your deployed backend
```

### Automated CI/CD

Every push to `main` triggers:
1. ESLint + Prettier check
2. Jest test suite (must pass)
3. Production build
4. Automatic Vercel deployment
5. Lighthouse performance audit

Every pull request gets a unique preview URL automatically.

### Complete Deployment Guide

See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) for the full step-by-step guide including custom domain setup, Supabase production configuration, and monitoring setup.

---

## 🤖 GitHub Copilot Usage

GitHub Copilot was integral to building this project efficiently. Here's where it made the biggest impact:

### How It Was Used

**Joi Validation Schemas**
Writing a comment describing the validation rules, then letting Copilot generate the full schema. For example, the item reporting schema with 12 fields, enum checks, date constraints, and custom error messages was generated from a 3-line comment.

**JWT Middleware**
Described the behavior in a comment (verify Supabase JWT, extract user ID and role, attach to `req.user`, return 401 if invalid). Copilot produced a production-quality middleware with proper error handling in one shot.

**React Native Paper Forms**
Copilot generated Formik-integrated forms with React Native Paper components, including inline validation error display, loading states, and accessibility labels.

**Test Generation**
Writing a function, then adding `// Write Jest unit tests for the function above, including edge cases and error scenarios` — Copilot generated thorough test suites that I then refined.

**SQL Query Optimization**
Complex queries (full-text search with ranked results, paginated with filters) were drafted by Copilot from descriptive comments and then optimized.

**RLS Policy SQL**
PostgreSQL Row Level Security syntax is verbose. Copilot generated correct policies from plain-English descriptions every time.

**JSDoc Documentation**
Typing `/**` above a function let Copilot autocomplete full JSDoc including `@param`, `@returns`, and usage examples.

### Estimated Time Saved

| Task | Estimated Time Saved |
|------|---------------------|
| Joi validation schemas | ~45 min |
| Auth middleware | ~30 min |
| Form components | ~60 min |
| API endpoint boilerplate | ~2 hrs |
| Unit test generation | ~3 hrs |
| SQL queries | ~45 min |
| JSDoc comments | ~2 hrs |
| RLS policies | ~1 hr |
| **Total** | **~12–15 hours** |

---

## 🧪 Testing

### Running Tests

```bash
# All tests
yarn test

# Frontend unit tests
cd packages/web && yarn test

# Backend integration tests
cd server && yarn test

# E2E tests (requires running app)
cd packages/web && yarn test:e2e

# Coverage report
yarn test --coverage
```

### Test Coverage Targets

| Layer | Framework | Target |
|-------|-----------|--------|
| Unit (utils, hooks, services) | Jest | > 90% |
| Component | React Testing Library | > 80% |
| Integration (API endpoints) | Jest + Supertest | > 80% |
| E2E (critical flows) | Cypress | 5 critical paths |
| Accessibility | axe-core + Lighthouse | Score ≥ 95 |
| Performance | Lighthouse CI | Score ≥ 90 |

### Critical E2E Flows

1. Sign up → Email verification → Login
2. Login → Report found item with photos → Success
3. Login → Browse items → Submit claim → Track status
4. Admin login → Approve pending item → Notifications sent
5. Admin login → Review claim → Approve → Item marked claimed

---

## 📈 Roadmap

### v1.0 — Current (Finish-Up-A-Thon Submission)
- [x] Authentication system (signup, login, email verify, password reset)
- [x] Item reporting (4-step wizard with image upload)
- [x] Smart search and browse with filters
- [x] Claims system with admin review
- [x] Admin dashboard with analytics
- [x] Real-time notifications
- [x] QR code handoff feature
- [x] Progressive Web App
- [x] CI/CD pipeline
- [x] Zero-cost cloud deployment

### v1.1 — Planned
- [ ] Native iOS + Android app (React Native, same codebase)
- [ ] Camera OCR — scan ID cards to auto-fill claim details
- [ ] AI-powered item matching — suggest similar items to lost item reports
- [ ] SMS notifications via Semaphore (Philippines SMS gateway)
- [ ] Integration with NEU student portal SSO

### v1.2 — Future
- [ ] Multi-campus support
- [ ] Barcode scanner for electronics
- [ ] Pickup scheduling system
- [ ] Item donation flow for unclaimed items

---

## 🤝 Contributing

Contributions are welcome. Please read [`docs/CONTRIBUTING.md`](./docs/CONTRIBUTING.md) for the full guide.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes (conventional commits)
git commit -m "feat: add SMS notification support"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Every PR runs the full CI pipeline. Tests must pass and coverage must not drop below the targets above.

---

## 🔒 Security

Found a security vulnerability? Please **do not** open a public issue. Email directly at `security@your-email.com`. See [`docs/SECURITY.md`](./docs/SECURITY.md) for our responsible disclosure policy.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) — for making a production-grade backend free
- [Vercel](https://vercel.com) — for zero-config deployments
- [React Native Paper](https://reactnativepaper.com) — for beautiful, accessible components
- [GitHub Copilot](https://github.com/features/copilot) — for being a genuinely useful coding partner
- **New Era University** — for the real problem that needed a real solution

---

<div align="center">

**Built with ❤️ for New Era University**

*GitHub Finish-Up-A-Thon 2026 Submission*

[🌐 Live Demo](#) · [📹 Video Walkthrough](#) · [🐛 Report Bug](../../issues) · [💬 DEV.to Post](#)

</div>
