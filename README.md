# UniFeed

UniFeed is a functional social campus platform for JECRC University, enabling a minimalistic, digital-passport-based event ecosystem with live feeds, real-time RSVPs, and strict authentication boundaries.

## Tech Stack
Our infrastructure relies on the modern, scalable **T3 Stack**:
- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Database**: PostgreSQL (via [Prisma ORM](https://prisma.io))
- **API**: [tRPC](https://trpc.io)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Auth**: [NextAuth.js (v5)](https://next-auth.js.org)

## Documentation Structure
The definitive documentation for the project is separated into the `docs/` folder:
- `docs/product/prd.md`
- `docs/architecture/architecture.md`
- `docs/design/ux-design-specification.md`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Setup the database: `npm run db:setup` (or `npx prisma db push`)
4. Start the dev server: `npm run dev`

See `CONTRIBUTING.md` for guidelines on how to collaborate or pick up tickets in our Git environment.
