# 🎬 MovieTracker - Discover Your Next Favorite Film

[![Demo](https://img.youtube.com/vi/qeMZ67QBQyk/maxresdefault.jpg)](https://youtu.be/qeMZ67QBQyk)

*A modern, intuitive movie discovery platform that helps you find films you'll actually enjoy*

## ✨ Features

### 🎯 Smart Movie Discovery
- **Advanced Search**: Find movies from thousands of titles using the OMDB API
- **Trending Insights**: See what's popular based on real user searches
- **Detailed Information**: Get comprehensive movie details at a glance

### 🎨 Beautiful User Experience
- **Modern Dark Theme**: Easy on the eyes with a sleek dark interface
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Interactive Cards**: Click any movie for detailed information in a elegant modal
- **Real-time Search**: Instant results with debounced search functionality

### 📊 Rich Movie Details
- **Complete Information**: Ratings, runtime, genre, director, cast, and plot
- **Visual Appeal**: High-quality posters with fallback handling
- **Quick Overview**: All essential details in an organized, scannable format

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern, component-based UI library
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Fast build tool and development server

### Backend & Database
- **Appwrite** - Backend-as-a-Service for authentication and data management
- **PostgreSQL** - Powerful relational database for trending analytics

### APIs & Services
- **OMDB API** - Comprehensive movie database with thousands of titles
- **Custom Analytics** - Track user searches and trending movies

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Appwrite account
- OMDB API key

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/movie-tracker.git

# Navigate to project directory
cd movie-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OMDB API key to .env

# Start development server
npm run dev
