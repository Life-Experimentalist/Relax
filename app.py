"""
Relax - Stress Buster App
A Flask web application that helps users relax with quotes, GIFs, and breathing exercises.
"""

import os
import random
from datetime import date, datetime

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template

# Load environment variables from .env file (for local development)
# In production (Render), environment variables are set directly
load_dotenv()

app = Flask(__name__)

# Configuration
GIPHY_API_KEY = os.environ.get("GIPHY_API_KEY", "YOUR_GIPHY_API_KEY_HERE")
QUOTABLE_API_URL = "https://api.quotable.io/random"
ZENQUOTES_API_URL = "https://zenquotes.io/api/random"

# Fallback quotes in case API fails
FALLBACK_QUOTES = [
    "Breathe. This too shall pass.",
    "You are stronger than you think.",
    "One step at a time.",
    "Peace comes from within. Do not seek it without.",
    "The present moment is all you ever have.",
    "Inhale confidence, exhale doubt.",
    "You are doing better than you think.",
    "Calmness is the cradle of power.",
    "Let it go. Let it be.",
    "Every moment is a fresh beginning.",
    "The quieter you become, the more you can hear.",
    "Smile, breathe, and go slowly.",
    "Be gentle with yourself.",
    "This moment is your life.",
    "Find peace in the chaos.",
]

# Fallback GIFs (calming/relaxing)
FALLBACK_GIFS = [
    "https://media.giphy.com/media/3o6ZsW9p2xX4k1zYxq/giphy.gif",
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
    "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
    "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
]


# Routes
@app.route("/")
def index():
    """Main page"""
    # Determine whether to show VKrishna04 in the footer (after 2025-12-01)
    try:
        now = datetime.now().date()
        cutoff = date(year=2025, month=12, day=1)
        show_vk = now > cutoff
    except Exception:
        show_vk = False

    return render_template("index.html", show_vk=show_vk)


@app.route("/api/quote")
def get_quote():
    """Get a random inspirational quote from free API"""
    try:
        # Try Quotable API first
        response = requests.get(QUOTABLE_API_URL, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if app.debug:
                app.logger.info(
                    f'💬 Quote from Quotable API: "{data["content"]}" - {data.get("author", "Unknown")}'
                )
            return jsonify(
                {
                    "text": data["content"],
                    "author": data.get("author", "Unknown"),
                    "source": "quotable",
                }
            )
    except Exception as e:
        app.logger.warning(f"Quotable API failed: {e}")

    try:
        # Try ZenQuotes API as backup
        response = requests.get(ZENQUOTES_API_URL, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data and len(data) > 0:
                if app.debug:
                    app.logger.info(
                        f'💬 Quote from ZenQuotes API (backup): "{data[0]["q"]}" - {data[0].get("a", "Unknown")}'
                    )
                return jsonify(
                    {
                        "text": data[0]["q"],
                        "author": data[0].get("a", "Unknown"),
                        "source": "zenquotes",
                    }
                )
    except Exception as e:
        app.logger.warning(f"ZenQuotes API failed: {e}")

    # Fallback to local quotes
    quote = random.choice(FALLBACK_QUOTES)
    if app.debug:
        app.logger.info(f'💬 Using FALLBACK quote: "{quote}" - Anonymous')
    return jsonify({"text": quote, "author": "Anonymous", "source": "local"})


@app.route("/api/gif")
def get_gif():
    """Get a random calming/relaxing GIF from Giphy API"""
    if GIPHY_API_KEY and GIPHY_API_KEY != "YOUR_GIPHY_API_KEY_HERE":
        try:
            params = {
                "api_key": GIPHY_API_KEY,
                "tag": random.choice(
                    ["calming", "relaxing", "peaceful", "nature", "meditation"]
                ),
                "rating": "g",
            }
            response = requests.get(
                "https://api.giphy.com/v1/gifs/random", params=params, timeout=5
            )
            if response.status_code == 200:
                data = response.json()
                if "data" in data and "images" in data["data"]:
                    gif_url = data["data"]["images"]["downsized_medium"]["url"]
                    # Log GIF URL in development mode
                    if app.debug:
                        app.logger.info(f"🎬 GIF from Giphy API: {gif_url}")
                    return jsonify({"url": gif_url, "source": "giphy"})
        except Exception as e:
            app.logger.warning(f"Giphy API failed: {e}")

    # Fallback to local GIF list
    gif_url = random.choice(FALLBACK_GIFS)
    if app.debug:
        app.logger.info(f"🎬 Using FALLBACK GIF: {gif_url}")
    return jsonify({"url": gif_url, "source": "fallback"})


@app.route("/api/meme")
def get_meme():
    """Get a random wholesome meme"""
    try:
        # Using meme-api for wholesome memes
        response = requests.get("https://meme-api.com/gimme/wholesomememes", timeout=5)
        if response.status_code == 200:
            data = response.json()
            meme_url = data["url"]
            meme_title = data.get("title", "")
            if app.debug:
                app.logger.info(f"😊 Meme from Reddit API: {meme_url}")
                app.logger.info(f"😊 Meme Title: {meme_title}")
            return jsonify({"url": meme_url, "title": meme_title, "source": "reddit"})
    except Exception as e:
        app.logger.warning(f"Meme API failed: {e}")

    # Fallback to a GIF if meme API fails
    if app.debug:
        app.logger.info("😊 Using FALLBACK: Redirecting to GIF endpoint")
    return get_gif()


@app.route("/api/health")
def health_check():
    """Health check endpoint"""
    return jsonify(
        {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "version": "1.0.0",
        }
    )


@app.route("/robots.txt")
def robots():
    """Serve robots.txt"""
    return app.send_static_file("robots.txt")


@app.route("/sitemap.xml")
def sitemap():
    """Serve sitemap.xml"""
    return app.send_static_file("sitemap.xml")


@app.route("/400")
@app.route("/400.html")
@app.errorhandler(404)
def not_found(error):
    """Custom 404 page"""
    return render_template("404.html"), 404


@app.route("/500")
@app.route("/500.html")
@app.errorhandler(500)
def internal_error(error):
    """Custom 500 page"""
    return render_template("500.html"), 500


if __name__ == "__main__":
    # Get port from environment variable (for Render deployment)
    port = int(os.environ.get("PORT", 5000))

    # Run the app
    app.run(
        host="0.0.0.0", port=port, debug=os.environ.get("FLASK_ENV") == "development"
    )
