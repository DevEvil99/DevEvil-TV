<div align="center" dir="auto">
<h1 align="center">DevEvil TV</h1>
<p align="center">DevEvil TV is a free and open-source movie and tv show streaming site. DevEvil TV offers users the chance to watch their favorite movies and series completely free of charge, without any annoying ads or the need to create an account.</p>
<a align="center" href="https://discord.gg/jsQ9UP7kCA" rel="nofollow"><img align="center" src="https://img.shields.io/discord/763094597454397490?color=5865F2&labelColor=white&label=Support%20Server&logo=Discord" style="max-width: 100%;"></a>
</div>
<br>

![tv](https://github.com/user-attachments/assets/ba066a76-ad6b-40ba-8657-12ff56a80587)


## 📖 Table of Contents

1. [Features](#features)  
2. [Prerequisites](#prerequisites)  
3. [Getting a TMDB API Key](#getting-a-tmdb-api-key)  
4. [Installation](#installation)  
5. [Configuration](#configuration)  
6. [Customizing Styles and Pages](#customizing-styles-and-pages)  
7. [Enabling Adult & NSFW Content](#enabling-adult--nsfw-content)
8. [Run & Build](#run--build)  
9. [Publishing](#publishing)  
10. [Contributing Your Website](#contributing-your-website)  
11. [Support & Donations](#support--donations)  
12. [License](#license)

---

## 🚀 Features

- Movie and TV show listings and streaming
- Easy to customize styles and components  
- Fully responsive and modern UI  
- Lightweight, clean, and developer-friendly codebase  
- Open-source and free to use

---

## 🔧 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **git**
- **npm** (comes with Node.js)
- **TMDB API Key** (Required)

---

## 🔑 Getting a TMDB API Key

To use TMDB's API, you'll need a free API key.

👉 Follow the official guide here:  
[TMDB API Getting Started](https://developer.themoviedb.org/docs/getting-started)

Once you have your key, you’ll use it in the configuration step.

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DevEvil99/DevEvil-TV.git
   cd DevEvil-TV
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

1. **Rename** the `.env.example` file to `.env`:
   ```bash
   mv .env.example .env
   ```

2. **Fill in your API key:**
   Open `.env` and set your TMDB API key:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

---

## 🎨 Customizing Styles and Pages

By default, styles are defined using CSS `:root` selectors in each style file. This approach was required in an earlier version, and although not ideal, it's currently necessary to manually update each one.

To update colors and themes:

1. **Edit every CSS file** and modify the `:root` variables.
2. **Also update colors** in:
   ```bash
   src/components/Others/SideButtons.jsx
   ```

> ⚠️ Please don’t remove or modify core functionality — you're free to customize layout, styles, and content, but try to preserve the app’s essential logic.

---

## 🔞 Enabling Adult & NSFW Content

If you want to allow adult and NSFW movies or TV shows to be displayed:

1. Open the following file:
   ```bash
   src/services/tmdbService.jsx
   ```

2. Replace **all instances** of:
   ```js
   include_adult=false
   ```
   with:
   ```js
   include_adult=true
   ```

> ⚠️ **Note:** This enables the listing of adult content. However, **many embedded streaming players do not support NSFW content**, so availability for streaming is **not guaranteed**.

---

## 🧪 Run & Build

### Start the app in development mode:
```bash
npm run start
```

### Build the app for production:
```bash
npm run build
```

---

## 🌐 Publishing

After building the app:

1. Locate the generated `build/` folder.
2. Upload the contents of this folder to your hosting provider (e.g., Netlify, Vercel, Firebase, or your own server).

That's it — your site is live!

---

## 🌟 Contributing Your Website

Built something cool with DevEvil-TV? Share it!

1. Go to the [Issues](https://github.com/DevEvil99/DevEvil-TV/issues) tab.
2. Click **"New Issue"**.
3. Select the **"Submit Site"** template.
4. Provide your site's name and link.

Your site may be featured in this README under a "Showcase" section!

---

## 💖 Support & Donations

If you like this project, consider supporting it!

- 🌐 Donate in crypto: [https://devevil.com/#donate](https://devevil.com/#donate)  
- 📢 Or support by sharing and using the code in your own projects.

Every bit helps me keep building!

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and share it.  
Just don’t remove the core functionality credits.

---
