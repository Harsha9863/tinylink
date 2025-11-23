# PostgreSQL Database Setup

## Quick Setup with Neon (Free PostgreSQL - Recommended)

### Step 1: Get a Free PostgreSQL Database
1. Go to **https://neon.tech**
2. Click "Sign Up" (free account)
3. Click "Create Project"
4. Choose a name and region
5. Click "Create Project"

### Step 2: Copy Connection String
1. After project creation, you'll see a connection string
2. It looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`
3. Click "Copy" to copy it

### Step 3: Create .env File
Create a `.env` file in the project root with:

```env
DATABASE_URL="paste-your-neon-connection-string-here"
BASE_URL="http://localhost:3000"
NODE_ENV="development"
```

### Step 4: Initialize Database
Run these commands:

```bash
npm run db:generate
npm run db:push
```

This will:
- Generate Prisma Client
- Create the database tables

### Step 5: Start the App
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Alternative: Local PostgreSQL

If you have PostgreSQL installed locally:

1. Create a database:
   ```bash
   createdb tinylink
   ```

2. Create `.env` file:
   ```env
   DATABASE_URL="postgresql://your-username:your-password@localhost:5432/tinylink?schema=public"
   BASE_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

3. Initialize:
   ```bash
   npm run db:generate
   npm run db:push
   ```

---

## Verify Setup

After setup, test the health endpoint:
```bash
curl http://localhost:3000/api/healthz
```

Should return: `{"ok": true, "version": "1.0"}`

