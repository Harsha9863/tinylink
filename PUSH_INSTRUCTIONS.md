# Push to GitHub - Instructions

## Current Status
✅ Git repository initialized
✅ All files committed
✅ Remote added: https://github.com/Harsha9863/tinylink.git

## To Push Your Code

### Option 1: Using Personal Access Token (Recommended)

1. **Create a GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: `tinylink-push`
   - Select scope: **`repo`** (full control of private repositories)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push your code:**
   ```bash
   cd /Users/harshavardhan/aru
   git push -u origin main
   ```
   
   When prompted:
   - **Username:** `Harsha9863`
   - **Password:** Paste your token (NOT your GitHub password)

### Option 2: Set Up SSH Keys (For Future)

If you want to use SSH in the future:

1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default location
   # Enter a passphrase (optional)
   ```

2. **Add to SSH agent:**
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Add to GitHub:**
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your key and save

4. **Test:**
   ```bash
   ssh -T git@github.com
   ```

5. **Push:**
   ```bash
   git remote set-url origin git@github.com:Harsha9863/tinylink.git
   git push -u origin main
   ```

---

## Quick Push (Option 1 - Token)

**Right now, the easiest way:**

1. Get token from: https://github.com/settings/tokens
2. Run: `git push -u origin main`
3. Enter username: `Harsha9863`
4. Enter password: (paste your token)

That's it! Your code will be on GitHub.

