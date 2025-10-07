# Environment Variables Setup Guide

This guide explains how to set up environment variables for the Relax app, both locally and on Render.

## 🔑 Giphy API Key

The Giphy API key is **optional** but recommended for better GIF quality and variety.

### How to Get a Free Giphy API Key

1. Go to [Giphy Developers](https://developers.giphy.com/)
2. Click "Create an App"
3. Select "API" (not SDK)
4. Fill in the form:
   - App Name: "Relax Stress Buster"
   - App Description: "Personal stress relief app"
5. Agree to terms and click "Create App"
6. Copy your API Key (it looks like: `abc123XYZ456def789GHI012jkl`)

---

## 💻 Local Development Setup

### Option 1: Using .env File (Recommended)

1. **Copy the example file:**
   ```powershell
   Copy-Item .env.example .env
   ```

2. **Edit the `.env` file:**
   ```powershell
   notepad .env
   ```

3. **Replace the placeholder with your actual API key:**
   ```
   GIPHY_API_KEY=your_actual_api_key_here
   ```

   Example:
   ```
   GIPHY_API_KEY=abc123XYZ456def789GHI012jkl
   ```

4. **Save and close the file**

5. **Run the app:**
   ```powershell
   uv run app.py
   ```

   The app will automatically load the `.env` file! ✨

### Option 2: Using Environment Variables Directly

```powershell
# Set the environment variable
$env:GIPHY_API_KEY = "your_actual_api_key_here"

# Run the app
uv run app.py
```

---

## 🚀 Render Deployment Setup

Render automatically loads environment variables you set in the dashboard. The app will work without any code changes!

### Steps:

1. **Deploy your app to Render** (see README.md for deployment guide)

2. **Go to your Render Dashboard:**
   - Navigate to your web service
   - Click on the "Environment" tab

3. **Add Environment Variable:**
   - Click "Add Environment Variable"
   - **Key:** `GIPHY_API_KEY`
   - **Value:** `your_actual_api_key_here` (paste your Giphy API key)
   - Click "Save Changes"

4. **Render will automatically redeploy** with the new environment variable

5. **That's it!** Your app will now use the Giphy API for GIFs ✨

---

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Use `.env` files for local development
- ✅ Add `.env` to `.gitignore` (already done!)
- ✅ Use Render's environment variables for production
- ✅ Keep your API keys private
- ✅ Use different API keys for development and production (if needed)

### ❌ DON'T:
- ❌ **NEVER** commit `.env` files to Git
- ❌ **NEVER** hardcode API keys in your code
- ❌ **NEVER** share your API keys publicly
- ❌ **NEVER** push `.env` to GitHub

---

## 🧪 Testing

### Verify Local Setup

```powershell
# Start the app
uv run app.py

# In another terminal, test the GIF endpoint
Invoke-WebRequest -Uri http://localhost:5000/api/gif -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Expected Response:**
```json
{
  "url": "https://media.giphy.com/media/...",
  "source": "giphy"
}
```

If `"source": "giphy"`, your API key is working! 🎉
If `"source": "fallback"`, the app is using fallback GIFs.

### Verify Render Setup

After deploying and adding the environment variable:

```powershell
# Test your live app
Invoke-WebRequest -Uri https://your-app-name.onrender.com/api/gif -UseBasicParsing | Select-Object -ExpandProperty Content
```

Should return `"source": "giphy"` if configured correctly.

---

## 🐛 Troubleshooting

### Issue: API key not being loaded

**Solution:**
```powershell
# Check if .env file exists
Test-Path .env

# Check contents (make sure no typos)
Get-Content .env

# Make sure there are NO spaces around the = sign
# ✅ Correct: GIPHY_API_KEY=abc123
# ❌ Wrong:   GIPHY_API_KEY = abc123
```

### Issue: Still using fallback GIFs

**Possible causes:**
1. Invalid API key
2. API key not set correctly in `.env`
3. Typo in variable name (must be exactly `GIPHY_API_KEY`)
4. API rate limit reached (Giphy free tier limit)

**Solution:**
- Verify your API key at [Giphy Developers Dashboard](https://developers.giphy.com/dashboard/)
- Check the `.env` file format
- Restart the app after changing `.env`

### Issue: .env file not found

**Solution:**
```powershell
# Create from example
Copy-Item .env.example .env

# Edit with your API key
notepad .env
```

---

## 📝 Environment Variables Reference

| Variable        | Required | Default      | Description                                          |
| --------------- | -------- | ------------ | ---------------------------------------------------- |
| `GIPHY_API_KEY` | No       | None         | Giphy API key for GIF generation                     |
| `FLASK_ENV`     | No       | `production` | Flask environment (`development` or `production`)    |
| `PORT`          | No       | `5000`       | Port to run the app (Render sets this automatically) |

---

## 🎯 Quick Setup Summary

### Local Development (3 steps):
```powershell
# 1. Copy example file
Copy-Item .env.example .env

# 2. Edit .env and add your Giphy API key
notepad .env

# 3. Run the app (it auto-loads .env)
uv run app.py
```

### Render Deployment (2 steps):
1. Go to Render Dashboard → Environment
2. Add `GIPHY_API_KEY` with your API key value

**Done!** 🎉

---

## ✨ How It Works

### Locally:
1. You create a `.env` file with your API key
2. `python-dotenv` package loads the `.env` file
3. `os.environ.get("GIPHY_API_KEY")` reads the value
4. App uses Giphy API for GIFs ✨

### On Render:
1. You add environment variables in Render dashboard
2. Render sets them as system environment variables
3. `os.environ.get("GIPHY_API_KEY")` reads the value
4. App uses Giphy API for GIFs ✨

**No code changes needed between local and production!** 🚀

---

## 📞 Need Help?

- Giphy API Docs: https://developers.giphy.com/docs/api
- Render Environment Variables: https://render.com/docs/environment-variables
- GitHub Issues: https://github.com/Life-Experimentalists/Relax/issues

---

**Made with ❤️ by VKrishna04**

*Keep your API keys secret, keep them safe!* 🔐
