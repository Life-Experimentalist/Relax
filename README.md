# Relax - Stress Buster App

**Live Demo:** [Coming Soon on Render]

Take a deep breath and relax with inspirational quotes, calming GIFs, wholesome memes, and guided breathing exercises. Your personal stress relief companion, built with Flask and Bootstrap.

## ✨ Features

- 🌟 **Daily Inspirational Quotes** - Uplifting wisdom from free quote APIs
- 🎬 **Calming GIFs** - Peaceful visuals from Giphy API
- 😊 **Wholesome Memes** - Light-hearted content to make you smile
- 🧘 **Breathing Exercises** - Guided meditation with visual animations
- 🌓 **Dark Mode Support** - Works perfectly with Dark Reader extension
- 📱 **Fully Responsive** - Works on all devices
- ♿ **Accessible** - ARIA labels, keyboard navigation, and semantic HTML
- 🔒 **Privacy-First** - No data collection or storage

## 🛠️ Technologies Used

### Backend
- **Flask** - Python web framework
- **Gunicorn** - Production WSGI server
- **Requests** - HTTP library for API calls
- **UV** - Modern Python package manager

### Frontend
- **HTML5** - Semantic markup
- **Bootstrap 5** - Responsive UI framework
- **jQuery** - DOM manipulation and AJAX
- **CSS3** - Custom styling with gradients and animations

### APIs (Free)
- **Quotable API** - Random inspirational quotes
- **ZenQuotes API** - Backup quote source
- **Giphy API** - Random calming GIFs
- **Meme API** - Wholesome memes from Reddit

### Deployment
- **Render** - Cloud hosting platform

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- [UV package manager](https://github.com/astral-sh/uv) (install with: `pip install uv`)

### Local Development

1. **Clone the repository**
   ```powershell
   git clone https://github.com/Life-Experimentalists/Relax.git
   cd Relax
   ```

2. **Install dependencies**
   ```powershell
   uv sync
   ```

3. **Setup environment variables (optional but recommended)**

   **Option A: Using .env file (easier)**
   ```powershell
   # Copy the example file
   Copy-Item .env.example .env

   # Edit .env and add your Giphy API key
   notepad .env
   ```

   **Option B: Set directly in terminal**
   ```powershell
   # Get a free API key from https://developers.giphy.com/
   $env:GIPHY_API_KEY = "your_giphy_api_key_here"
   ```

   > 📘 See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions

4. **Run the application**
   ```powershell
   uv run app.py
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📦 Project Structure

```
Relax/
├── app.py                 # Main Flask application
├── pyproject.toml         # UV package configuration
├── uv.lock               # UV lock file
├── render.yaml           # Render deployment config
├── .env.example          # Environment variables template
├── ENV_SETUP.md          # Environment setup guide
├── templates/            # HTML templates
│   ├── index.html       # Main page
│   ├── 404.html         # Not found page
│   └── 500.html         # Error page
├── static/              # Static assets
│   ├── css/
│   │   └── style.css    # Custom styles
│   ├── js/
│   │   └── script.js    # Frontend logic
│   └── images/          # Image assets
├── specs/               # Project documentation
└── README.md           # This file
```

> 💡 **Note:** After cloning, copy `.env.example` to `.env` and add your Giphy API key for better GIF quality!

## 🌐 Deployment to Render

### One-Click Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Manual Deployment

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Select the `Relax` repository

3. **Configure the service**
   - Name: `relax-stress-bust` (or your choice)
   - Environment: `Python 3`
   - Build Command: `pip install uv && uv sync`
   - Start Command: `uv run gunicorn app:app`

4. **Add environment variable** (optional but recommended)
   - Go to "Environment" tab
   - Click "Add Environment Variable"
   - Key: `GIPHY_API_KEY`
   - Value: Your Giphy API key (get free key at https://developers.giphy.com/)
   - Click "Save Changes"

5. **Deploy!**
   - Render will automatically build and deploy your app
   - Your app will be live at `https://your-app-name.onrender.com`
   - Render automatically loads environment variables - no code changes needed! ✨

> 📘 **Detailed Environment Setup:** See [ENV_SETUP.md](ENV_SETUP.md) for step-by-step instructions

### Environment Variables

| Variable        | Description                                | Required                                         |
| --------------- | ------------------------------------------ | ------------------------------------------------ |
| `GIPHY_API_KEY` | Giphy API key for GIF generation           | No (falls back to hardcoded GIFs)                |
| `PORT`          | Port for Flask to run on                   | No (defaults to 5000, Render sets automatically) |
| `FLASK_ENV`     | Flask environment (development/production) | No (defaults to production)                      |

## 🎨 Customization

### Change Quote Sources
Edit `app.py` and modify the `get_quote()` function to use different APIs or add more fallback sources.

### Change GIF Themes
Modify the `tag` parameter in `app.py` `get_gif()` function:
```python
'tag': random.choice(['calming', 'relaxing', 'peaceful', 'nature', 'meditation'])
```

### Adjust Breathing Exercise
In `static/js/script.js`, modify the timing:
```javascript
// Change from 4 seconds to your preference
setTimeout(() => {
    // Breathe In duration
}, 4000);
```

## 🧪 Testing

### Manual Testing
1. Open the app in your browser
2. Click "I Need Relief" button
3. Verify random selection of GIF/Meme/Breathing exercise
4. Test dark mode toggle
5. Test quote refresh button

### Browser Testing
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

### Dark Mode Testing
- ✅ System dark mode preference
- ✅ Manual toggle button
- ✅ Dark Reader extension compatibility

## 📝 API Documentation

### GET `/`
Returns the main application page.

### GET `/api/quote`
Returns a random inspirational quote.

**Response:**
```json
{
  "text": "Breathe. This too shall pass.",
  "author": "Anonymous",
  "source": "quotable"
}
```

### GET `/api/gif`
Returns a random calming GIF URL.

**Response:**
```json
{
  "url": "https://media.giphy.com/media/...",
  "source": "giphy"
}
```

### GET `/api/meme`
Returns a random wholesome meme.

**Response:**
```json
{
  "url": "https://i.redd.it/...",
  "title": "Wholesome content",
  "source": "reddit"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-07T12:00:00",
  "version": "1.0.0"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE.md) file for details.

## 👤 Author

**VKrishna04**

- Website: [vkrishna04.me](https://vkrishna04.me)
- GitHub: [@VKrishna04](https://github.com/VKrishna04)
- Organization: [Life Experimentalists](https://github.com/Life-Experimentalists)

## 🙏 Acknowledgments

- Quote APIs: [Quotable](https://github.com/lukePeavey/quotable) & [ZenQuotes](https://zenquotes.io/)
- GIF API: [Giphy](https://developers.giphy.com/)
- Meme API: [Meme API](https://github.com/D3vd/Meme_Api)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/)
- UI Framework: [Bootstrap](https://getbootstrap.com/)

## 📊 SEO & Accessibility

- ✅ Semantic HTML5 tags
- ✅ Meta tags for SEO (Open Graph, Twitter Cards)
- ✅ Structured data (Schema.org)
- ✅ ARIA labels for accessibility
- ✅ Keyboard navigation support
- ✅ Mobile-first responsive design
- ✅ Fast loading times (<2s)
- ✅ Dark mode support

## 🐛 Known Issues

None at this time. Please report issues on the [GitHub Issues page](https://github.com/Life-Experimentalists/Relax/issues).

## 🔮 Future Enhancements

- [ ] User preferences storage (localStorage)
- [ ] More breathing exercise patterns
- [ ] Sound effects/ambient music
- [ ] Share quotes on social media
- [ ] Multi-language support
- [ ] PWA (Progressive Web App) support
- [ ] Analytics dashboard

---

Made with ❤️ by [VKrishna04](https://vkrishna04.me) | [View on GitHub](https://github.com/Life-Experimentalists/Relax)
