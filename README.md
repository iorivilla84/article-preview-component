# Article Tooltip Component

A responsive and accessible article preview layout with share functionality, built using semantic HTML5, modern ES6 JavaScript, and Bootstrap 5. The component displays an article preview with an image, author details, and a dynamic tooltip for sharing, adapting based on the user's device size on desktop and clicking the mobile share button slides up a full-width panel with share icons (animated from bottom up).

---

## Features

- Responsive Article Layout
- Image on the left, content on the right (desktop).
- Stacks vertically on mobile using Bootstrap’s grid system and custom styles.
- Share Button Tooltip
- Desktop: Clicking the share button shows a tooltip beside it with share options.
- Mobile: Clicking the mobile share button slides up a full-width panel with share icons (animated from bottom up).
- Close tooltips on outside click or share button

### Semantic HTML

- Proper use of `<main>`, `<article>`, `<header>`, `<section>`, and `<footer>` for SEO and accessibility.
- Bootstrap Integration
- Uses Bootstrap 5 for layout container.
- Custom styling layered on top via css/main.css.
- Dynamic Date Display
- Injects today's date into the article footer on page load using JavaScript.

---

## Tech Stack

- **HTML5** – Semantic markup
- **CSS (with nesting)** – Organized styles using native nesting (CSS or Sass-like)
- **JavaScript ES6** – Modular approach using `import`/`export`
- **Netlify** – Hosting and automatic CI/CD
- **GitHub** – Source control and integration with Netlify

---

## Project Structure
<pre lang="markdown"> article-preview-component/
├── index.html
├── assets/
│   ├── images
├── css/
│   └── article-tooltip.css
│   └── main.css
├── js/
│   ├── article-tooltip.js
│   ├── main.js
├── README.md </pre>

## Deployment
This project is deployed using Netlify. Every push to the main branch triggers an automatic deployment.

---

## How It Works
Tooltip Logic (main.js)
- Detects screen size on button click.
- Shows the appropriate tooltip:
  - `.sharing-tooltip` for desktop
  - `.article-sharing-wrapper-mobile` for mobile
- Resets tooltips on resize with debouncing to prevent visibility issues across breakpoints.

---

## Getting Started
### Running Locally
Since ES6 modules and fetch() are used, you must run the app from a local or remote server.
You can use Live Server (VSCode extension) or run:
`npx live-server`
Open your browser at http://127.0.0.1:5500` (or as specified by Live Server).

### Installation

```bash
git clone git@github.com:iorivilla84/article-preview-component.git
cd article-preview-component
