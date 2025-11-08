# Dolabb Admin Dashboard

A modern, responsive admin dashboard built with React, Vite, and Tailwind CSS. Features include user management, listing management, transactions, disputes, and notifications with beautiful charts and a professional UI.

## Features

- 📊 **Interactive Charts** - Line charts, bar charts, and pie charts using Recharts
- 🎨 **Modern UI** - Clean, professional design with light theme
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Overlay Sidebar** - Sidebar opens as an overlay without stretching the design
- 🔔 **Real-time Notifications** - Notification system with badges
- 📋 **Data Tables** - Responsive tables with horizontal scrolling
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Chart library
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AnasPirzada/dolabb_dashbaord.git
cd dolabb_dashbaord
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Deployment on Vercel

This project is configured for easy deployment on Vercel:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import the repository: `AnasPirzada/dolabb_dashbaord`

2. **Vercel will auto-detect the settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project

The `vercel.json` file is already configured with the correct settings for SPA routing.

## Project Structure

```
dashboard/
├── src/
│   ├── components/      # Reusable components (Layout, Sidebar, Navbar)
│   ├── pages/          # Page components (Dashboard, UserManagement, etc.)
│   ├── data/           # Dummy data for development
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── vercel.json         # Vercel deployment configuration
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is private and proprietary.
