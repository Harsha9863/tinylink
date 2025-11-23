# Token Permission Issue

The token is getting a 403 error. This usually means the token doesn't have the right permissions.

## Fix: Create a New Token with Correct Permissions

1. **Go to GitHub Token Settings:**
   - https://github.com/settings/tokens

2. **Delete the old token** (if you want) or create a new one

3. **Create New Token:**
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: `tinylink-push`
   - **IMPORTANT:** Select these scopes:
     - ✅ **`repo`** (Full control of private repositories)
       - This includes: repo:status, repo_deployment, public_repo, repo:invite, security_events
   - Click "Generate token"
   - **Copy the new token**

4. **Push with new token:**
   ```bash
   cd /Users/harshavardhan/aru
   git push -u origin main
   ```
   
   When prompted:
   - Username: `Harsha9863`
   - Password: (paste your NEW token)

## Alternative: Use GitHub CLI

If you have GitHub CLI installed:
```bash
gh auth login
gh repo create tinylink --public --source=. --remote=origin --push
```

## Verify Token Permissions

Your token MUST have the `repo` scope to push code. Check this when creating the token.

