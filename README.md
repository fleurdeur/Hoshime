# Hoshime

![GitHub stars](https://img.shields.io/github/stars/fleurdeur/Hoshime?style=for-the-badge&logo=github) ![GitHub forks](https://img.shields.io/github/forks/fleurdeur/Hoshime?style=for-the-badge&logo=github) ![GitHub issues](https://img.shields.io/github/issues/fleurdeur/Hoshime?style=for-the-badge&logo=github) ![Last commit](https://img.shields.io/github/last-commit/fleurdeur/Hoshime?style=for-the-badge&logo=github)

## 📑 Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Key Dependencies](#key-dependencies)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Contributors](#contributors)
- [Contributing](#contributing)

## 📝 Description

Represents star ratings and the stellar world of anime tracking.

## 🛠️ Tech Stack

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🏗️ Architecture

A high-level view of how the main pieces fit together:

```mermaid
flowchart TD
    User["👤 User / Browser"]
    FE["🖼️ React Frontend"]
    User --> FE
    API["⚙️ Express API"]
    FE --> API
```

## ⚡ Quick Start

```bash

# 1. Clone the repository
git clone https://github.com/fleurdeur/Hoshime.git

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env   # then fill in the values

# 4. Start the dev server
npm run dev
```

## 🔑 Environment Variables

The following environment variables are required (see `.env.example`):

```bash
GEMINI_API_KEY=
APP_URL=
```

## 📦 Key Dependencies

```
@google/genai: ^2.4.0
@tailwindcss/vite: ^4.3.3
@vitejs/plugin-react: ^6.1.1
lucide-react: ^0.546.0
react: ^19.0.1
react-dom: ^19.0.1
vite: ^8.3.0
express: ^4.21.2
dotenv: ^17.2.3
motion: ^12.23.24
```

## 🚀 Available Scripts

- **dev** — `npm run dev`
- **build** — `npm run build`
- **preview** — `npm run preview`
- **clean** — `npm run clean`
- **lint** — `npm run lint`

## 📁 Project Structure

```
.
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── AndroidFrame.tsx
│   │   ├── AnimeImage.tsx
│   │   ├── BottomNavBar.tsx
│   │   ├── ImportExportModal.tsx
│   │   ├── LoggerModal.tsx
│   │   ├── NavigationDrawer.tsx
│   │   ├── SearchFilterSheet.tsx
│   │   ├── ShareStoryModal.tsx
│   │   ├── StarRating.tsx
│   │   ├── TopAppBar.tsx
│   │   └── WidgetsModal.tsx
│   ├── context
│   │   └── AppContext.tsx
│   ├── data
│   │   └── animeDatabase.ts
│   ├── index.css
│   ├── main.tsx
│   ├── services
│   │   └── animeApi.ts
│   ├── types
│   │   └── anime.ts
│   └── views
│       ├── AnimeDetailView.tsx
│       ├── DiscoverView.tsx
│       ├── HomeFeedView.tsx
│       ├── ListsCommunityView.tsx
│       ├── NotificationCenterView.tsx
│       ├── OnboardingView.tsx
│       ├── ProfileView.tsx
│       └── SettingsView.tsx
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Development Setup

### Node.js / JavaScript
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` (or `yarn` / `pnpm install` / `bun install`)
3. Start the dev server: see the **Quick Start** above

## 👥 Contributors

Thanks to everyone who has contributed to this project:

<p align="left">
<a href="https://github.com/fleurdeur" title="fleurdeur"><img src="https://avatars.githubusercontent.com/u/319274093?v=4&s=64" width="64" height="64" alt="fleurdeur" style="border-radius:50%" /></a>
</p>

[See the full list of contributors →](https://github.com/fleurdeur/Hoshime/graphs/contributors)

## 👥 Contributing

Contributions are welcome! Here's the standard flow:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/fleurdeur/Hoshime.git`
3. **Branch**: `git checkout -b feature/your-feature`
4. **Commit**: `git commit -m 'feat: add some feature'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a pull request

Please follow the existing code style and include tests for new behavior where applicable.

---

<div align="center">

[![Made with ReadmeBuddy](https://img.shields.io/badge/Made%20with-ReadmeBuddy-8B5CFF?style=for-the-badge&logo=markdown&logoColor=white)](https://readmebuddy.com)

<sub>Generate beautiful READMEs in seconds → <a href="https://readmebuddy.com">readmebuddy.com</a></sub>

</div>
