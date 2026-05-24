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
AUTH_SECRET=""
DATABASE_URL="postgresql://postgres:password@localhost:5432/Platform"
ALLOWED_DOMAINS="students.college.edu"
STUDENT_QR_SECRET=""
```

- `AUTH_SECRET`: NextAuth signing secret for session security.
- `DATABASE_URL`: PostgreSQL connection string for the app database.
- `ALLOWED_DOMAINS`: comma-separated university domains used for registration and seed email generation.
- `STUDENT_QR_SECRET`: dedicated signing secret for permanent student QR tokens. Keep this different from `AUTH_SECRET`.

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

Optional upload values stay blank for local/manual image URL workflows. Configure them in deployed environments when organizers should upload directly to object storage. `UPLOAD_PUBLIC_BASE_URL` is also used by `next/image` as the explicit production image host for uploaded event media.

When the upload variables are not configured, organizer image uploads use the local development upload endpoint and return `/uploads/...` URLs. In deployed environments, set the upload variables and `UPLOAD_PUBLIC_BASE_URL` to the public CDN or object-storage origin that should serve organizer images.

### Seed Setup

The seed script reads the first domain from `ALLOWED_DOMAINS` and uses it to generate the local campus accounts. All seeded users share the password `Test@1234`.

- Student: `student.1@<your allowed domain>`
- Organizer: `organizer.coding@<your allowed domain>`
- Admin: `admin.jecrc@<your allowed domain>`

Seeded data includes:

- one JECRC college scope and one secondary college for isolation checks
- student, organizer, and admin roles
- published student-visible events plus hub content
- verified student profiles with permanent QR IDs

### Seed Credentials

- Email: `student.1@<your allowed domain>`
- Password: `Test@1234`

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before changing code.
