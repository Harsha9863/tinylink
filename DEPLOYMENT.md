# Deployment Guide for TinyLink

## Option 1: Vercel (Recommended - Easiest for Next.js)

### Step 1: Prepare Your Code
1. Make sure your code is pushed to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Go to **https://vercel.com**
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables
In Vercel project settings, add these environment variables:

```
DATABASE_URL=postgresql://neondb_owner:npg_txsyw4IrLP5V@ep-ancient-field-ad167qhd-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
BASE_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

**Important:** Replace `BASE_URL` with your actual Vercel deployment URL after first deploy.

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-3 minutes)
3. Your app will be live at `https://your-app-name.vercel.app`

### Step 5: Update BASE_URL
After first deployment:
1. Go to Project Settings → Environment Variables
2. Update `BASE_URL` to your actual Vercel URL
3. Redeploy (or it will auto-update on next push)

### Step 6: Run Database Migration
After deployment, run:
```bash
npm run db:push
```
Or use Vercel CLI:
```bash
npx vercel env pull .env.local
npm run db:push
```

---

## Option 2: Render

### Step 1: Prepare Code
Push to GitHub (same as Vercel)

### Step 2: Create Web Service
1. Go to **https://render.com**
2. Sign up/Login
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository

### Step 3: Configure
- **Name**: tinylink (or your choice)
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: Free

### Step 4: Environment Variables
Add in Render dashboard:
```
DATABASE_URL=your-neon-connection-string
BASE_URL=https://your-app.onrender.com
NODE_ENV=production
```

### Step 5: Deploy
Click **"Create Web Service"**

**Note:** Render free tier spins down after inactivity. First request may be slow.

---

## Option 3: Railway

### Step 1: Prepare Code
Push to GitHub

### Step 2: Deploy
1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository

### Step 3: Environment Variables
Add in Railway dashboard:
```
DATABASE_URL=your-neon-connection-string
BASE_URL=https://your-app.up.railway.app
NODE_ENV=production
```

### Step 4: Configure
- Railway auto-detects Next.js
- It will build and deploy automatically

---

## Database Setup for Production

### Using Neon (Already Set Up)
Your Neon database is already configured and will work in production.

**Important:** Make sure your Neon connection string allows connections from anywhere (which it does by default).

### Alternative: Railway PostgreSQL
If you want to use Railway's PostgreSQL:
1. In Railway project, add **PostgreSQL** service
2. Copy the connection string
3. Update `DATABASE_URL` in environment variables

---

## Post-Deployment Checklist

### 1. Test All Endpoints
- [ ] Health check: `https://your-app.com/api/healthz`
- [ ] Dashboard: `https://your-app.com`
- [ ] Create a link
- [ ] Test redirect
- [ ] View stats page
- [ ] Delete a link

### 2. Update BASE_URL
Make sure `BASE_URL` in environment variables matches your actual domain.

### 3. Database Migration
Run `npm run db:push` to ensure schema is up to date.

### 4. Test Redirects
Short links should work: `https://your-app.com/YOUR_CODE`

---

## Continuous Deployment

### Vercel
- Automatically deploys on every push to main branch
- Preview deployments for pull requests

### Render
- Auto-deploys on push to main branch
- Can configure in dashboard

### Railway
- Auto-deploys on push to main branch
- Can configure in project settings

---

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### Render
1. Go to service settings
2. Add custom domain
3. Configure DNS

---

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in deployment platform

### Database Connection Errors
- Verify `DATABASE_URL` is set correctly
- Check Neon database is running
- Ensure connection string includes SSL parameters

### Redirects Not Working
- Verify `BASE_URL` matches your actual domain
- Check that redirect route is working: `/:code`

### Environment Variables Not Loading
- Restart/redeploy after adding variables
- Verify variable names match exactly
- Check for typos in values

---

## Quick Deploy Commands (Vercel CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Recommended: Vercel

For Next.js apps, **Vercel is the easiest**:
- ✅ Zero configuration
- ✅ Automatic deployments
- ✅ Free tier is generous
- ✅ Built by Next.js creators
- ✅ Fast CDN
- ✅ Automatic SSL

Your app will be live in under 5 minutes!

