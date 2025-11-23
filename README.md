# TinyLink - URL Shortener

A full-stack URL shortener application built with Next.js, PostgreSQL, and Tailwind CSS. Similar to bit.ly, this application allows users to create short links, track click statistics, and manage their links.

## Features

- **Create Short Links**: Convert long URLs into short, memorable links
- **Custom Codes**: Optionally specify custom short codes (6-8 characters)
- **Click Tracking**: Automatically track clicks and last clicked time
- **Link Management**: View all links, search/filter, and delete links
- **Statistics**: View detailed statistics for each link
- **Responsive Design**: Clean, modern UI that works on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Prisma ORM)
- **Hosting**: Vercel (recommended)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or Neon)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd aru
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tinylink?schema=public"
BASE_URL="http://localhost:3000"
NODE_ENV="development"
```

For production, use your actual database URL (e.g., from Neon) and your production domain.

### 4. Set up the database

Generate Prisma Client:

```bash
npm run db:generate
```

Push the schema to your database:

```bash
npm run db:push
```

Or run migrations:

```bash
npm run db:migrate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Health Check
- `GET /api/healthz` - Returns `{ "ok": true, "version": "1.0" }`

### Links
- `GET /api/links` - Get all links
- `POST /api/links` - Create a new link
  - Body: `{ "targetUrl": "https://example.com", "code": "optional" }`
  - Returns 409 if code already exists
- `GET /api/links/:code` - Get stats for a specific link
- `DELETE /api/links/:code` - Delete a link

## Routes

- `/` - Dashboard (list all links, create new links)
- `/code/:code` - Statistics page for a specific link
- `/:code` - Redirect to the original URL (302 redirect)
- `/healthz` - Health check endpoint

## Code Validation

- Custom codes must be 6-8 characters
- Only alphanumeric characters (A-Z, a-z, 0-9)
- Codes are globally unique
- If no code is provided, a random code is generated

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `BASE_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
4. Deploy!

### Database Setup (Neon)

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your `.env` file as `DATABASE_URL`
5. Run `npm run db:push` to set up the schema

## Project Structure

```
/aru
├── app/
│   ├── api/              # API routes
│   ├── code/[code]/      # Stats page
│   ├── [code]/           # Redirect handler
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Dashboard
├── components/           # React components
├── lib/                 # Utilities and database
├── prisma/              # Prisma schema
└── public/              # Static assets
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma Client
npm run db:generate

# Push schema changes
npm run db:push
```

## Testing

The application follows specific URL conventions for automated testing:

- All routes must match the specification exactly
- API endpoints return appropriate HTTP status codes
- Redirects use HTTP 302
- Deleted links return 404

## License

ISC

