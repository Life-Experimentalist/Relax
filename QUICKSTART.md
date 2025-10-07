# Quick Start Guide - Relax Stress Buster App

Get up and running in 3 minutes! ⚡

## 🚀 Fastest Way to Run

### Option 1: Run Locally

```powershell
# 1. Clone the repo
git clone https://github.com/Life-Experimentalists/Relax.git
cd Relax

# 2. Install UV (if not already installed)
pip install uv

# 3. Install dependencies
uv sync

# 4. Run the app
uv run app.py

# 5. Open browser
# Visit: http://localhost:5000
```

That's it! 🎉

### Option 2: Deploy to Render (5 clicks)

1. Fork this repo on GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Select your forked repo
5. Click "Create Web Service"

Live in ~2 minutes! 🚀

---

## 📋 Requirements

- Python 3.9 or higher
- UV package manager (install with: `pip install uv`)
- Internet connection (for CDN resources)

---

## 🔧 Optional Configuration

### Add Giphy API Key (Better GIFs)

**Method 1: Using .env file (Recommended)**

1. Get free API key: https://developers.giphy.com/
2. Copy the example file:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Edit `.env` and add your API key:
   ```powershell
   notepad .env
   ```
4. Replace `your_actual_giphy_api_key_here` with your real API key
5. Run the app (it auto-loads .env):
   ```powershell
   uv run app.py
   ```

**Method 2: Set environment variable directly**

```powershell
$env:GIPHY_API_KEY = "your_key_here"
uv run app.py
```

> 📘 **Detailed guide:** See [ENV_SETUP.md](ENV_SETUP.md) for complete instructions

Without API key: App uses fallback GIFs (still works fine!)

---

## 🎯 Features to Try

1. **Daily Quote** - Refreshes on page load
2. **Stress Relief Button** - Click "I Need Relief"
   - 40% chance: Calming GIF
   - 40% chance: Wholesome meme
   - 20% chance: Breathing exercise
3. **Dark Mode** - Click moon icon in navbar
4. **Keyboard Shortcuts**:
   - Press `S` for stress relief
   - Press `Q` for new quote

---

## 🐛 Troubleshooting

### "Module not found" error?
```powershell
uv sync
```

### Port 5000 already in use?
```powershell
# Change port in app.py or kill process:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Templates not loading?
Check you're in the correct directory with `app.py` file.

---

## 📚 Learn More

- Full README: [README.md](README.md)
- Environment Setup Guide: [ENV_SETUP.md](ENV_SETUP.md)
- API Documentation: See README "API Documentation" section

---

## 🤝 Contributing

Found a bug? Have an idea?
1. Open an issue
2. Submit a pull request
3. Star the repo ⭐

---

**Made with ❤️ by [VKrishna04](https://vkrishna04.me)**

Enjoy your moment of peace! 🧘‍♂️✨
