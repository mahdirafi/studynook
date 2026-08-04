# StudyNook

**StudyNook** is a study room booking web application that lets users discover, list, and reserve study rooms. Built with Next.js (App Router) on the frontend, connected to the [studynook-server](https://github.com/mahdirafi/studynook-server) Express.js/MongoDB backend.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Component Library:** [HeroUI v3](https://www.heroui.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/) with [MongoDB adapter](https://www.better-auth.com/docs/adapters/mongo)
- **Database:** MongoDB
- **Theming:** next-themes (light/dark mode support)
- **Icons:** react-icons, @gravity-ui/icons
- **Notifications:** react-hot-toast
- **Linting:** ESLint 9

## Features

- 🔐 Authentication with Better Auth (email/password and/or OAuth via Google)
- 🌗 Light/dark theme support
- 🏠 Browse and search available study rooms
- 📄 Room details page with amenities, pricing, and availability
- ➕ Add, edit, and delete room listings
- 📅 Book study rooms with date/time selection
- 🎨 Custom themed UI built with HeroUI v3 (blue color scheme)
- 🔔 Toast notifications for user feedback
- 📱 Responsive design across devices

## Prerequisites

- [Node.js](https://nodejs.org/) 18.18+ (recommended: latest LTS)
- A running instance of the [studynook-server](https://github.com/mahdirafi/studynook-server) backend
- A [MongoDB](https://www.mongodb.com/atlas) database (for Better Auth)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahdirafi/studynook.git
cd studynook
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string

# OAuth (if applicable)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Update the keys above to match exactly what's referenced in `src/lib/auth.js` (or your auth config file) and other env reads across the project.

### 4. Run the development server

```bash
npm run dev
```

Open [https://studynook-ten-gamma.vercel.app/] in your browser to see the app.

### 5. Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
studynook/
├── public/              # Static assets
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   ├── components/       # Reusable UI components
│   └── lib/               # Utilities, auth config, API helpers
├── eslint.config.mjs
├── next.config.mjs
├── postcss.config.mjs
├── jsconfig.json
└── package.json
```

> Update this tree once the folder layout under `src/` is finalized (e.g. `src/app/(auth)`, `src/app/rooms`, `src/components/ui`, etc.).

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint checks                    |

## Related Repositories

- **Backend API:** [studynook-server](https://github.com/mahdirafi/studynook-server)

## Deployment

The recommended way to deploy this app is via [Vercel](https://vercel.com/new), the platform built by the creators of Next.js.

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Add all required environment variables in the Vercel project settings.
4. Ensure `BETTER_AUTH_URL` and OAuth redirect URIs match your production domain.
5. Deploy 🚀

## Author

**Mahdi Rafi**
GitHub: [@mahdirafi](https://github.com/mahdirafi)

## License

This project is licensed under the MIT License.
