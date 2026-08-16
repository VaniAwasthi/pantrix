# Pantrix

Smart pantry management app — track inventory expiry dates and get recipe suggestions based on what you have.

**GitHub:** [VaniAwasthi/pantrix](https://github.com/VaniAwasthi/pantrix)

## Features

- **User authentication** — Register and login with secure JWT sessions
- **Pantry inventory** — Add items with quantity, category, and expiry date
- **Expiry tracking** — Items grouped as fresh, expiring soon (3 days), or expired
- **Recipe API** — Our own Indian recipe catalog stored in the database (breakfast / lunch / dinner / snack), matched to your pantry
- **Full-stack API** — Next.js App Router API routes with PostgreSQL via Prisma

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Prisma](https://www.prisma.io) + PostgreSQL
- Deploy on [Vercel](https://vercel.com)

## Project Structure

```
├── app/                    # Next.js pages & API routes
│   ├── api/               # Backend API (auth, pantry, recipes)
│   ├── login/             # Login & register
│   ├── pantry/            # Inventory management
│   ├── recipes/           # Recipe suggestions
│   ├── shopping/          # Shopping list
│   └── setup/             # Onboarding
├── components/
│   ├── common/            # Shared UI (Logo, LoadingSpinner)
│   ├── forms/             # Custom pantry forms
│   ├── layout/            # Navbar, AppShell
│   ├── pantry/            # Pantry list & expiry badges
│   ├── discover/          # Recipe discovery UI
│   └── ui/                # Button, Input, Card
├── lib/                   # DB, auth, recipe engine
├── prisma/                # Database schema
├── types/                 # TypeScript types
└── utils/                 # Constants, helpers, validators
```

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/VaniAwasthi/pantrix.git
cd pantrix
npm install
```

### 2. Set up environment

Copy the environment file (already done if you followed setup):

```bash
cp .env.example .env
```

**Local dev:** SQLite is fine for quick local testing.

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-random-secret-key"
```

**Vercel production:** use a real PostgreSQL database from [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/storage/postgres). Set `DATABASE_URL` in Vercel env vars and change the Prisma datasource provider in `prisma/schema.prisma` to `"postgresql"` before deploying.

## Indian recipe catalog

Pantrix ships with **210+** Indian recipes (breakfast, lunch, dinner, snacks, desserts, drinks) in your own database.

Ingredient matching understands Hindi/English aliases, e.g. `tomato` = `tamatar` = `tomatoes`.

Re-seed anytime:

```bash
npm run db:seed
```


### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## User Flow

1. **Login / Register** at `/login` or `/register`
2. **Kitchen onboarding** at `/setup`, then add groceries
3. **Manage inventory** at `/pantry` with expiry dates
4. **Get recipes** at `/recipes` matched to your pantry

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| GET | `/api/auth/me` | Current user |
| GET/POST | `/api/pantry` | List / add items |
| PUT/DELETE | `/api/pantry/[id]` | Update / delete item |
| GET | `/api/recipes` | List Indian recipes (`?mealType=` `&q=`) |
| GET | `/api/recipes/[id]` | Single recipe |
| GET | `/api/recipes/suggest` | Match recipes to your pantry |

## Deploy on Vercel

1. Push to GitHub: `git push origin main`
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables: `DATABASE_URL`, `JWT_SECRET`
4. Run `npx prisma migrate deploy` (add as build command or run manually)
5. Deploy

Recommended `package.json` build script for Vercel:

```json
"build": "prisma generate && next build"
```

Add a postinstall script on Vercel (optional):

```json
"postinstall": "npx prisma generate"
```

## License

MIT
