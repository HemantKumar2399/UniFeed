<div align="center">
  <img src="https://via.placeholder.com/150/000000/FFFFFF?text=UniFeed" alt="UniFeed Logo" width="120" />
  <h1>UniFeed</h1>
  <p><strong>A campus event platform built for university communities.</strong></p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://prisma.io"><img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" /></a>
    <a href="https://trpc.io"><img src="https://img.shields.io/badge/tRPC-Endpoints-2596be?style=for-the-badge&logo=typescript" alt="tRPC" /></a>
  </p>
</div>

---

## About

UniFeed bridges the gap between noisy chat groups and formal campus announcements. Students can discover events, RSVP, and access event identity flows, while organizers manage publishing, attendance, and community pages.

## Tech Stack

Built on the T3-style stack:

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 15 App Router | SSR, routing, and server components |
| Styles | Tailwind CSS and shadcn/ui | Accessible UI primitives |
| Database | PostgreSQL | Relational data store |
| ORM | Prisma | Typed database access |
| API | tRPC | End-to-end typed APIs |
| Auth | NextAuth v5 | Session and credentials auth |

## Documentation

- [Product Requirements Document](./docs/product/prd.md)
- [Technical Architecture](./docs/architecture/architecture.md)
- [UX and Design Specifications](./docs/design/ux-design-specification.md)
- [Implementation Status](./docs/implementation-status.md)
- [Placeholder Backlog](./docs/placeholder-backlog.md)

## Quick Start

1. Install dependencies
2. Copy `.env`
3. Start the local database
4. Generate Prisma client
5. Push the Prisma schema
6. Seed test data
7. Run the dev server

### Windows PowerShell

Preferred path:

```powershell
npm run setup:windows
npm run dev
```

Manual path:

```powershell
Copy-Item .env.example .env
npm run db:start:windows
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

### WSL, macOS, or Linux

Preferred path:

```bash
npm run setup
npm run dev
```

Manual path:

```bash
cp .env.example .env
npm run db:start
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

### Environment Values

Set these required values in `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/Platform"
ALLOWED_DOMAINS="students.college.edu"
```

Optional Google sign-in values:

```env
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

Optional deployment values:

```env
NEXT_PUBLIC_APP_URL=""
UPLOAD_BUCKET_NAME=""
UPLOAD_REGION=""
UPLOAD_ACCESS_KEY_ID=""
UPLOAD_SECRET_ACCESS_KEY=""
UPLOAD_PUBLIC_BASE_URL=""
```

When the upload variables are not configured, organizer image uploads will return a clear configuration error and the event editor will fall back to manual hosted-image URLs.

### Seed Credentials

- Email: `student.1@<your allowed domain>`
- Password: `Test@1234`

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before changing code.
