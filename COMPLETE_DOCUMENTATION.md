# TinyLink - Complete Documentation

## 📖 Table of Contents
1. [What is TinyLink?](#what-is-tinylink)
2. [What Technologies We Used](#what-technologies-we-used)
3. [Prerequisites (What You Need)](#prerequisites)
4. [Step-by-Step Setup Guide](#step-by-step-setup-guide)
5. [How to Run the Application](#how-to-run-the-application)
6. [How to Build for Production](#how-to-build-for-production)
7. [How to Deploy](#how-to-deploy)
8. [Errors We Faced and Solutions](#errors-we-faced-and-solutions)
9. [Project Structure](#project-structure)
10. [Testing the Application](#testing-the-application)
11. [Troubleshooting](#troubleshooting)

---

## What is TinyLink?

TinyLink is a **URL Shortener** application - just like bit.ly or TinyURL. 

**What does it do?**
- Takes a long URL (like `https://www.example.com/very/long/url/path`)
- Creates a short link (like `yoursite.com/abc123`)
- When someone clicks the short link, they get redirected to the original long URL
- Tracks how many times each link was clicked
- Shows statistics for each link

**Example:**
- Long URL: `https://www.google.com/search?q=hello+world`
- Short URL: `yoursite.com/google`
- When someone visits `yoursite.com/google`, they automatically go to Google

---

## What Technologies We Used

### Exact Versions Used:

| Technology | Version | What It Does |
|------------|---------|--------------|
| **Node.js** | 23.11.0 | JavaScript runtime (the engine that runs our code) |
| **npm** | 10.9.2 | Package manager (installs libraries) |
| **Next.js** | 16.0.3 | Web framework (builds our website) |
| **React** | 19.2.0 | UI library (creates the user interface) |
| **TypeScript** | 5.9.3 | Programming language (adds type safety) |
| **Tailwind CSS** | 3.4.18 | Styling framework (makes it look good) |
| **Prisma** | 6.19.0 | Database toolkit (talks to database) |
| **PostgreSQL** | (via Neon) | Database (stores all the links) |
| **PostCSS** | 8.5.6 | CSS processor (processes styles) |
| **Autoprefixer** | 10.4.22 | CSS tool (adds browser prefixes) |

### Why These Technologies?

1. **Next.js**: Makes it easy to build websites with React, handles routing automatically
2. **TypeScript**: Catches errors before running code
3. **Tailwind CSS**: Fast way to style without writing lots of CSS
4. **Prisma**: Easy way to work with databases
5. **PostgreSQL**: Reliable database that stores our links safely

---

## Prerequisites

Before you start, you need these installed on your computer:

### 1. Node.js (Version 18 or higher)
- **What it is**: Software that runs JavaScript code
- **How to check if you have it**: Open terminal and type `node --version`
- **If you don't have it**: 
  - Go to https://nodejs.org
  - Download the LTS (Long Term Support) version
  - Install it (just click Next, Next, Next)
  - Restart your terminal

### 2. npm (Comes with Node.js)
- **What it is**: Package manager (installs libraries)
- **How to check**: Type `npm --version` in terminal
- **If missing**: Install Node.js (npm comes with it)

### 3. Git (Optional but recommended)
- **What it is**: Version control (saves your code)
- **How to check**: Type `git --version` in terminal
- **If you don't have it**: 
  - Go to https://git-scm.com
  - Download and install
  - Restart terminal

### 4. A Code Editor
- **Recommended**: Visual Studio Code (VS Code)
- **Download**: https://code.visualstudio.com
- **Why**: Makes coding easier with helpful features

### 5. A PostgreSQL Database
- **Option 1**: Neon (Free, Recommended) - https://neon.tech
- **Option 2**: Local PostgreSQL (if you have it installed)

---

## Step-by-Step Setup Guide

Follow these steps **exactly** to set up the project:

### Step 1: Get the Code

**Option A: If you have the code on your computer:**
```bash
cd /path/to/your/project
```

**Option B: If you need to get it from GitHub:**
```bash
git clone https://github.com/Harsha9863/tinylink.git
cd tinylink
```

### Step 2: Install Dependencies

Dependencies are like tools your project needs to work. Install them:

```bash
npm install
```

**What this does:**
- Reads `package.json` file
- Downloads all required libraries (Next.js, React, Prisma, etc.)
- Saves them in `node_modules` folder
- Takes 1-2 minutes

**Expected output:**
```
added 140 packages, and audited 140 packages in 25s
```

### Step 3: Set Up Database

#### Option A: Using Neon (Free, Recommended)

1. **Create Neon Account:**
   - Go to https://neon.tech
   - Click "Sign Up" (use GitHub or email)
   - It's completely free!

2. **Create a Project:**
   - After signing up, click "Create Project"
   - Give it a name: `tinylink`
   - Choose a region (closest to you)
   - Click "Create Project"

3. **Get Connection String:**
   - After project creation, you'll see a connection string
   - It looks like: `postgresql://user:password@host/database?sslmode=require`
   - Click "Copy" to copy it

4. **Create .env File:**
   - In your project folder, create a file named `.env`
   - Add these lines (replace with your actual connection string):
   ```env
   DATABASE_URL="paste-your-neon-connection-string-here"
   BASE_URL="http://localhost:3000"
   NODE_ENV="development"
   ```
   - Save the file

#### Option B: Using Local PostgreSQL

1. **Install PostgreSQL** (if not installed):
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create Database:**
   ```bash
   createdb tinylink
   ```

3. **Create .env File:**
   ```env
   DATABASE_URL="postgresql://your-username:your-password@localhost:5432/tinylink?schema=public"
   BASE_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

### Step 4: Set Up Database Schema

This creates the tables in your database:

```bash
npm run db:generate
npm run db:push
```

**What these commands do:**
- `db:generate`: Creates Prisma Client (code to talk to database)
- `db:push`: Creates tables in your database

**Expected output:**
```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema
```

### Step 5: Verify Setup

Check if everything is working:

```bash
# Check if server starts (press Ctrl+C to stop)
npm run dev
```

You should see:
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

If you see this, **congratulations!** Setup is complete! 🎉

---

## How to Run the Application

### Running in Development Mode

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Go to: http://localhost:3000
   - You should see the TinyLink dashboard

3. **To stop the server:**
   - Press `Ctrl + C` in the terminal

### What Each Command Does

| Command | What It Does |
|---------|--------------|
| `npm run dev` | Starts development server (for coding) |
| `npm run build` | Creates production build (optimized version) |
| `npm start` | Runs production build |
| `npm run db:generate` | Generates Prisma Client |
| `npm run db:push` | Updates database schema |

### Development vs Production

- **Development** (`npm run dev`):
  - Shows errors clearly
  - Auto-reloads when you change code
  - Not optimized (slower)
  - Good for coding

- **Production** (`npm run build` + `npm start`):
  - Optimized (faster)
  - No error details (for security)
  - Good for real users

---

## How to Build for Production

Building creates an optimized version of your app:

### Step 1: Build the Application

```bash
npm run build
```

**What this does:**
- Compiles TypeScript to JavaScript
- Optimizes code
- Creates production-ready files in `.next` folder
- Takes 1-2 minutes

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

### Step 2: Start Production Server

```bash
npm start
```

**What this does:**
- Starts the optimized version
- Runs on http://localhost:3000
- Faster than development mode

### Step 3: Test Production Build

1. Open browser: http://localhost:3000
2. Test all features:
   - Create a link
   - View links
   - Test redirect
   - View stats
   - Delete link

---

## How to Deploy

Deploying means putting your app on the internet so others can use it.

### Option 1: Deploy to Vercel (Easiest - Recommended)

#### Step 1: Push Code to GitHub

1. **Create GitHub Repository:**
   - Go to https://github.com
   - Click "+" → "New repository"
   - Name: `tinylink`
   - Click "Create repository"

2. **Push Your Code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/tinylink.git
   git push -u origin main
   ```

#### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project:**
   - Click "Add New Project"
   - Select your `tinylink` repository
   - Click "Import"

3. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add these 3 variables:

   **Variable 1:**
   - Key: `DATABASE_URL`
   - Value: `your-neon-connection-string`
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Key: `BASE_URL`
   - Value: `https://your-app.vercel.app` (update after first deploy)
   - Environment: Production, Preview, Development

   **Variable 3:**
   - Key: `NODE_ENV`
   - Value: `production`
   - Environment: Production, Preview, Development

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live!

5. **Update BASE_URL:**
   - After deployment, Vercel gives you a URL
   - Go to Environment Variables
   - Update `BASE_URL` to your actual Vercel URL
   - Redeploy

#### Step 3: Set Up Database for Production

After first deployment, run:

```bash
# In your local terminal
npm run db:push
```

Or use Vercel CLI:
```bash
npx vercel env pull .env.local
npm run db:push
```

### Option 2: Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Add environment variables (same as Vercel)
7. Click "Create Web Service"

### Option 3: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Add environment variables
7. Railway auto-deploys!

---

## Errors We Faced and Solutions

### Error 1: Tailwind CSS v4 PostCSS Plugin Error

**Error Message:**
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. 
The PostCSS plugin has moved to a separate package.
```

**What Happened:**
- We installed Tailwind CSS v4, which has a different setup
- Our PostCSS config was for v3

**Solution:**
```bash
npm uninstall tailwindcss
npm install tailwindcss@^3.4.0
```

**Why This Works:**
- Tailwind v3 works with our current setup
- v4 requires different configuration
- v3 is stable and well-supported

---

### Error 2: Environment Variable Not Found

**Error Message:**
```
error: Environment variable not found: DATABASE_URL
```

**What Happened:**
- The `.env` file wasn't created
- Or the dev server was started before creating `.env`
- Or the dev server needs to be restarted

**Solution:**
1. Create `.env` file in project root:
   ```env
   DATABASE_URL="your-connection-string"
   BASE_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

2. **Restart the dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

**Why This Works:**
- Next.js reads `.env` file when it starts
- If you create `.env` after starting server, it won't see it
- Always restart after changing environment variables

---

### Error 3: Database Connection Failed

**Error Message:**
```
Can't reach database server
```

**What Happened:**
- Wrong connection string
- Database server is down
- Network issues

**Solution:**
1. **Check connection string:**
   - Make sure it's correct
   - Should start with `postgresql://`
   - Should include `?sslmode=require` for Neon

2. **Test connection:**
   ```bash
   node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$queryRaw\`SELECT 1\`.then(() => console.log('DB OK')).catch(e => console.error('DB Error:', e.message)).finally(() => prisma.\$disconnect())"
   ```

3. **If using Neon:**
   - Check if project is active
   - Verify connection string in Neon dashboard

---

### Error 4: Failed to Create Link (403 Error)

**Error Message:**
```
Failed to create link
remote: Permission denied
```

**What Happened:**
- GitHub token didn't have correct permissions
- Token was read-only

**Solution:**
1. **Create new token with correct permissions:**
   - Go to https://github.com/settings/tokens
   - Generate new token (classic)
   - Select **"repo"** scope (Full control)
   - Not just "readonly"

2. **Use new token:**
   ```bash
   git push -u origin main
   # Enter username and new token as password
   ```

---

### Error 5: Prisma Client Not Generated

**Error Message:**
```
Cannot find module '@prisma/client'
```

**What Happened:**
- Prisma Client wasn't generated
- Or node_modules was deleted

**Solution:**
```bash
npm install
npm run db:generate
```

**Why This Works:**
- `db:generate` creates Prisma Client
- Must run after installing dependencies
- Must run after changing Prisma schema

---

### Error 6: Port Already in Use

**Error Message:**
```
Port 3000 is already in use
```

**What Happened:**
- Another app is using port 3000
- Previous dev server is still running

**Solution:**
1. **Find what's using port 3000:**
   ```bash
   lsof -ti:3000
   ```

2. **Kill the process:**
   ```bash
   kill -9 $(lsof -ti:3000)
   ```

3. **Or use different port:**
   ```bash
   npm run dev -- -p 3001
   ```

---

### Error 7: Module Not Found

**Error Message:**
```
Module not found: Can't resolve '@/lib/db'
```

**What Happened:**
- File doesn't exist
- Path alias not configured
- TypeScript config issue

**Solution:**
1. **Check if file exists:**
   ```bash
   ls lib/db.ts
   ```

2. **Check tsconfig.json:**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

3. **Restart dev server**

---

### Error 8: Invalid URL Format

**Error Message:**
```
Invalid URL format. Must be http:// or https://
```

**What Happened:**
- User entered URL without protocol
- URL validation failed

**Solution:**
- This is expected behavior!
- URLs must start with `http://` or `https://`
- User should enter: `https://example.com`
- Not just: `example.com`

---

## Project Structure

Here's what each folder/file does:

```
tinylink/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes (backend)
│   │   ├── healthz/              # Health check endpoint
│   │   └── links/                # Link management endpoints
│   ├── code/[code]/              # Stats page for each link
│   ├── [code]/                   # Redirect handler
│   ├── healthz/                  # Health check page
│   ├── layout.tsx                # Root layout (wraps all pages)
│   ├── page.tsx                  # Dashboard (home page)
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── AddLinkForm.tsx           # Form to create links
│   ├── LinkTable.tsx             # Table showing all links
│   └── StatsCard.tsx             # Statistics display
│
├── lib/                          # Utility functions
│   ├── db.ts                     # Database connection
│   ├── utils.ts                  # Helper functions
│   └── validation.ts             # URL and code validation
│
├── prisma/                       # Database schema
│   └── schema.prisma             # Database model definition
│
├── .env                          # Environment variables (NOT in git)
├── .env.example                  # Example env file (safe to share)
├── .gitignore                    # Files to ignore in git
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── next.config.js                # Next.js configuration
└── README.md                      # Project documentation
```

### Key Files Explained:

1. **app/page.tsx**: Main dashboard page (shows all links)
2. **app/api/links/route.ts**: API to create/get links
3. **app/[code]/page.tsx**: Handles redirects when someone clicks short link
4. **prisma/schema.prisma**: Defines database structure
5. **components/**: Reusable UI components

---

## Testing the Application

### Manual Testing Checklist

1. **Health Check:**
   - Visit: http://localhost:3000/api/healthz
   - Should return: `{"ok": true, "version": "1.0"}`

2. **Create Link (No Custom Code):**
   - Go to dashboard
   - Enter URL: `https://google.com`
   - Leave code empty
   - Click "Create Link"
   - Should see success message
   - Link appears in table

3. **Create Link (With Custom Code):**
   - Enter URL: `https://github.com`
   - Enter code: `github` (6-8 characters)
   - Click "Create Link"
   - Should work

4. **Duplicate Code Error:**
   - Try to create another link with code `github`
   - Should show error: "Code already exists"

5. **Invalid URL:**
   - Enter: `not-a-url`
   - Should show error about invalid URL

6. **Redirect:**
   - Click on a short link in table
   - Should redirect to original URL
   - Click count should increase

7. **Stats Page:**
   - Click on a code in table
   - Should show statistics page
   - Should display clicks, dates, etc.

8. **Delete Link:**
   - Click "Delete" on a link
   - Confirm deletion
   - Link should disappear
   - Visiting short URL should show 404

9. **Search/Filter:**
   - Create multiple links
   - Use search box
   - Should filter results

### API Testing (Using curl)

```bash
# Health check
curl http://localhost:3000/api/healthz

# Create link
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"targetUrl": "https://example.com"}'

# Get all links
curl http://localhost:3000/api/links

# Get specific link
curl http://localhost:3000/api/links/YOUR_CODE

# Delete link
curl -X DELETE http://localhost:3000/api/links/YOUR_CODE
```

---

## Troubleshooting

### Problem: App won't start

**Check:**
1. Node.js installed? `node --version`
2. Dependencies installed? `npm install`
3. `.env` file exists?
4. Database connection works?

**Solution:**
```bash
npm install
npm run db:generate
npm run db:push
npm run dev
```

---

### Problem: Database errors

**Check:**
1. `.env` file has `DATABASE_URL`?
2. Connection string is correct?
3. Database is running?

**Solution:**
```bash
# Test database connection
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$queryRaw\`SELECT 1\`.then(() => console.log('OK')).catch(e => console.error(e)).finally(() => prisma.\$disconnect())"

# Regenerate Prisma Client
npm run db:generate
npm run db:push
```

---

### Problem: Styles not loading

**Check:**
1. Tailwind CSS installed?
2. `globals.css` imported in `layout.tsx`?

**Solution:**
```bash
npm install tailwindcss@^3.4.0
# Restart dev server
```

---

### Problem: Can't push to GitHub

**Check:**
1. Git initialized? `git status`
2. Remote added? `git remote -v`
3. Token has `repo` scope?

**Solution:**
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/tinylink.git
# Use token with 'repo' scope
git push -u origin main
```

---

### Problem: Build fails

**Check:**
1. All dependencies installed?
2. TypeScript errors?
3. Environment variables set?

**Solution:**
```bash
npm install
npm run build
# Check error messages
```

---

## Quick Reference Commands

```bash
# Setup
npm install                    # Install dependencies
npm run db:generate           # Generate Prisma Client
npm run db:push               # Update database schema

# Development
npm run dev                   # Start dev server
npm run build                 # Build for production
npm start                     # Run production build

# Database
npm run db:generate           # Generate Prisma Client
npm run db:push               # Push schema to database
npm run db:migrate            # Create migration

# Git
git init                      # Initialize git
git add .                     # Stage all files
git commit -m "message"       # Commit changes
git push                      # Push to GitHub
```

---

## Important Notes

### Security
- **Never commit `.env` file** - It contains passwords!
- `.env` is in `.gitignore` - Safe
- Only `.env.example` should be in git

### Database
- Neon database is free for development
- Connection string contains password - keep it secret!
- Always use SSL (`?sslmode=require`)

### Deployment
- Always set environment variables in hosting platform
- Update `BASE_URL` after first deployment
- Run `npm run db:push` after deploying

### Code Quality
- TypeScript catches errors early
- Follow the code structure
- Test before deploying

---

## Need Help?

If you're stuck:

1. **Check error messages** - They usually tell you what's wrong
2. **Read this documentation** - Most common issues are covered
3. **Check GitHub Issues** - Someone might have the same problem
4. **Ask for help** - Stack Overflow, GitHub Discussions, etc.

---

## Summary

**What we built:**
- A URL shortener like bit.ly
- Dashboard to manage links
- Statistics tracking
- API endpoints
- Beautiful, responsive UI

**Technologies:**
- Next.js 16, React 19, TypeScript 5
- Tailwind CSS 3, Prisma 6
- PostgreSQL (Neon)

**Key Features:**
- Create short links
- Custom codes (optional)
- Click tracking
- Link management
- Statistics page

**Deployment:**
- GitHub for code
- Vercel for hosting
- Neon for database

---

## Final Checklist

Before considering the project complete:

- [ ] Code works locally (`npm run dev`)
- [ ] All features tested
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Render/Railway
- [ ] Environment variables set
- [ ] Database connected
- [ ] Health check works
- [ ] Can create links
- [ ] Redirects work
- [ ] Statistics work
- [ ] Can delete links

---

**Congratulations!** 🎉

You now have a complete, working URL shortener application!

If you followed this guide, you should be able to:
- Set up the project from scratch
- Run it locally
- Build for production
- Deploy to the internet
- Fix common errors

Good luck with your project! 🚀

