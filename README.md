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
│  ├─ (routes)
│  │  ├─ calendar
│  │  │  └─ page.tsx
│  │  ├─ dashboard
│  │  │  └─ page.tsx
│  │  ├─ pomodoro
│  │  │  └─ page.tsx
│  │  ├─ sign-in
│  │  │  └─ [[...sign-in]]
│  │  │     └─ page.tsx
│  │  ├─ sign-up
│  │  │  └─ [[...sign-up]]
│  │  │     └─ page.tsx
│  │  └─ tasks
│  │     └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ settings
│  │  │  └─ route.ts
│  │  ├─ task-components
│  │  │  ├─ route.ts
│  │  │  ├─ task
│  │  │  │  └─ [id]
│  │  │  │     └─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ tasks
│  │  │  ├─ category
│  │  │  │  └─ [id]
│  │  │  │     └─ route.ts
│  │  │  ├─ route.ts
│  │  │  └─ [id]
│  │  │     └─ route.ts
│  │  ├─ users
│  │  │  └─ route.ts
│  │  └─ webhooks
│  │     └─ clerk
│  │        └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ bun.lockb
├─ components
│  └─ ui
│     ├─ alert-dialog.tsx
│     ├─ button.tsx
│     ├─ select.tsx
│     ├─ skeleton.tsx
│     ├─ table.tsx
│     ├─ tabs.tsx
│     ├─ textarea.tsx
│     ├─ toast.tsx
│     └─ toaster.tsx
├─ components.json
├─ eslint.config.mjs
├─ middleware.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ default-avatar-image.jpg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ tomato-icon.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ client
│  │  ├─ api
│  │  │  ├─ mutations
│  │  │  │  ├─ category
│  │  │  │  │  ├─ useCreateCategoy.ts
│  │  │  │  │  ├─ useDeleteCategory.ts
│  │  │  │  │  └─ useUpdateCategory.ts
│  │  │  │  ├─ setting
│  │  │  │  │  └─ useUpdateSettings.ts
│  │  │  │  ├─ task
│  │  │  │  │  ├─ useCreateTask.ts
│  │  │  │  │  ├─ useDeleteTask.ts
│  │  │  │  │  └─ useUpdateTask.ts
│  │  │  │  └─ taskComp
│  │  │  │     ├─ useCreateTaskComp.ts
│  │  │  │     ├─ useDeleteTaskComp.ts
│  │  │  │     └─ useUpdateTaskComp.ts
│  │  │  └─ queries
│  │  │     ├─ useCatigoryQuery.ts
│  │  │     ├─ useSettingQuery.ts
│  │  │     ├─ useTaskCompQuery.ts
│  │  │     └─ useTaskQuery.ts
│  │  ├─ components
│  │  │  ├─ features
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ calendar.tsx
│  │  │  │  │  ├─ pomodoroSamary.tsx
│  │  │  │  │  └─ todayTodos.tsx
│  │  │  │  ├─ pomodoro
│  │  │  │  │  ├─ bluredCercle.tsx
│  │  │  │  │  ├─ completePomoPanel.tsx
│  │  │  │  │  ├─ endSessionDialog.tsx
│  │  │  │  │  ├─ mainPomo.tsx
│  │  │  │  │  ├─ mainPomoButtons.tsx
│  │  │  │  │  ├─ pageFooter.tsx
│  │  │  │  │  ├─ pageHeading.tsx
│  │  │  │  │  ├─ pageHeadingDesc.tsx
│  │  │  │  │  ├─ pomoConfirmationButtons.tsx
│  │  │  │  │  └─ pomoProgressBar.tsx
│  │  │  │  ├─ settings
│  │  │  │  │  └─ pomodoroTab.tsx
│  │  │  │  └─ tasks
│  │  │  │     ├─ cards
│  │  │  │     │  ├─ categoryCard.tsx
│  │  │  │     │  ├─ taskCard.tsx
│  │  │  │     │  └─ taskCompCard.tsx
│  │  │  │     ├─ categories.tsx
│  │  │  │     ├─ dialogs
│  │  │  │     │  ├─ categoryDialog.tsx
│  │  │  │     │  ├─ taskCompDialong.tsx
│  │  │  │     │  └─ taskDialog.tsx
│  │  │  │     ├─ taskComponents.tsx
│  │  │  │     └─ tasks.tsx
│  │  │  ├─ layout
│  │  │  │  ├─ dialogs
│  │  │  │  │  └─ settings.dialog.tsx
│  │  │  │  └─ navbar.tsx
│  │  │  └─ ui
│  │  │     ├─ button.tsx
│  │  │     ├─ checkbox.tsx
│  │  │     ├─ dialog.tsx
│  │  │     ├─ dropdown-menu.tsx
│  │  │     ├─ input.tsx
│  │  │     ├─ label.tsx
│  │  │     ├─ resizable.tsx
│  │  │     ├─ separator.tsx
│  │  │     ├─ sheet.tsx
│  │  │     ├─ sidebar.tsx
│  │  │     ├─ skeleton.tsx
│  │  │     └─ tooltip.tsx
│  │  ├─ context
│  │  ├─ hooks
│  │  │  ├─ use-mobile.tsx
│  │  │  ├─ use-toast.ts
│  │  │  ├─ useBreakConfirmation.tsx
│  │  │  └─ useSettings.ts
│  │  ├─ providers
│  │  │  ├─ queryProvider.tsx
│  │  │  └─ settingsProvider.tsx
│  │  ├─ store
│  │  │  ├─ useCategoryStore.ts
│  │  │  ├─ usePomoStore.ts
│  │  │  ├─ useSettingsStore.ts
│  │  │  └─ useTaskStore.ts
│  │  └─ styles
│  │     ├─ calendar.css
│  │     └─ removeInputBorder.css
│  ├─ server
│  │  ├─ controllers
│  │  │  ├─ category.controller.ts
│  │  │  ├─ settings.controller.ts
│  │  │  ├─ task.controller.ts
│  │  │  ├─ taskComponent.controller.ts
│  │  │  └─ user.controller.ts
│  │  ├─ db
│  │  │  └─ schema.ts
│  │  ├─ middlewares
│  │  │  ├─ authenticateUser.ts
│  │  │  ├─ errorHandler.ts
│  │  │  ├─ handleValidationError.ts
│  │  │  └─ validateOwnership.ts
│  │  └─ repositories
│  │     ├─ categoryRepo.ts
│  │     ├─ settingsRepo.ts
│  │     ├─ taskComponentRepo.ts
│  │     ├─ taskRepo.ts
│  │     └─ userRepo.ts
│  └─ shared
│     ├─ constant
│     │  └─ endpoints.ts
│     ├─ types
│     │  ├─ enum
│     │  │  └─ common.enum.ts
│     │  └─ interfaces
│     │     ├─ common.interface.ts
│     │     ├─ pomodoro.interface.ts
│     │     ├─ store.interface.ts
│     │     ├─ task.interface.ts
│     │     └─ taskComp.interface.ts
│     ├─ utils
│     │  └─ utils.ts
│     └─ validations
│        ├─ errors
│        │  └─ validation.error.ts
│        ├─ schemas
│        │  ├─ category.schema.ts
│        │  ├─ settings.schema.ts
│        │  ├─ task.shema.ts
│        │  └─ taskComponent.shema.ts
│        └─ validators
│           ├─ category.validator.ts
│           ├─ settings.validator.ts
│           ├─ task.validator.ts
│           └─ taskComponent.validator.ts
├─ tailwind.config.ts
└─ tsconfig.json

```