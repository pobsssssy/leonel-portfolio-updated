# Leonel Pobre Portfolio

A responsive dark-mode portfolio for **Leonel Pobre — Software Developer & AI Automation**.

## Main features

- React 19 + Vite 8
- Chakra UI v3 components
- React Router navigation
- Responsive desktop and mobile navigation
- Accessible burger menu with Escape-key support and body scroll lock
- Scroll-to-section route behavior
- IntersectionObserver reveal animations
- Responsive project, experience, skills, and contact layouts
- Placeholder content marked with `TODO` comments

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Before publishing

Search the project for `TODO:` and replace the placeholder biography, dates, links, contact details, avatar, and project content.

## Theme and mobile navigation

- Dark mode is enabled by default through `next-themes`.
- The theme toggle remembers the visitor's light/dark preference.
- The responsive navigation uses a full opaque mobile overlay, so page content does not show behind the burger menu.
- Pressing Escape, selecting a link, or returning to desktop width closes the menu.
