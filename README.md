This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
Note
├─ .gitignore
├─ .prettierrc
├─ app
│  ├─ api
│  │  ├─ hello
│  │  │  └─ route.ts
│  │  ├─ tasks
│  │  │  └─ route.ts
│  │  └─ webhooks
│  │     └─ route.ts
│  ├─ checklist
│  │  ├─ page.tsx
│  │  └─ _components
│  │     ├─ categories.tsx
│  │     └─ tasks.tsx
│  ├─ dashboard
│  │  ├─ page.tsx
│  │  └─ _components
│  │     ├─ calendar.tsx
│  │     ├─ pomodoroSamary.tsx
│  │     └─ todayTodos.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ pomodoro
│  │  └─ page.tsx
│  ├─ sign-in
│  │  └─ [[...sign-in]]
│  │     └─ page.tsx
│  ├─ sign-up
│  │  └─ [[...sign-up]]
│  │     └─ page.tsx
│  ├─ store
│  │  ├─ useAuthStore.ts
│  │  └─ usePomoStore.ts
│  ├─ styles
│  │  └─ calendar.css
│  └─ types
│     └─ interfaces
│        ├─ common.interface.ts
│        ├─ pomodoro.interface.ts
│        └─ store.interface.ts
├─ bun.lockb
├─ components
│  ├─ pomoProgressBar.conponent.tsx
│  ├─ sideBar.component.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ checkbox.tsx
│     ├─ input.tsx
│     ├─ resizable.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     └─ tooltip.tsx
├─ components.json
├─ db
│  └─ schema.ts
├─ eslint.config.mjs
├─ hooks
│  └─ use-mobile.tsx
├─ lib
│  └─ utils.ts
├─ middleware.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ tomato-icon.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json

```