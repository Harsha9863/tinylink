# Push to GitHub - Step by Step

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website
1. Go to **https://github.com**
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository name: `tinylink` (or your choice)
4. Description: "URL Shortener application built with Next.js"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create tinylink --public --source=. --remote=origin --push
```

---

## Step 2: Connect and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tinylink.git

# Or if you prefer SSH:
git remote add origin git@github.com:YOUR_USERNAME/tinylink.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files
3. Make sure `.env` is NOT there (it's in .gitignore - good!)

---

## Important Notes

✅ **DO NOT push `.env` file** - It contains your database password!
- It's already in `.gitignore` so it won't be pushed
- Only `.env.example` will be pushed (which is safe)

✅ **Files that WILL be pushed:**
- All source code
- Configuration files
- README.md
- .env.example (template, no secrets)

✅ **Files that WON'T be pushed (in .gitignore):**
- .env (your secrets)
- node_modules/
- .next/
- Build artifacts

---

## After Pushing

Once pushed, you can:
1. Deploy to Vercel (connect GitHub repo)
2. Share the repository URL
3. Continue development with version control

