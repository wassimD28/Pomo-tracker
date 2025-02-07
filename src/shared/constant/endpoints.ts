export const API_ENDPOINTS = {
  // Categories
  CATEGORIES: {
    BASE: "/api/categories",
    BY_ID: (id: number) => `/api/categories/${id}`,
  },
  // Tasks
  TASKS: {
    BASE: "/api/tasks",
    BY_ID: (id: number) => `/api/tasks/${id}`,
    BY_CATEGORY: (categoryId: number) => `/api/tasks/category/${categoryId}`,
    BY_SEARCH_TERM: (searchTerm: string) => `/api/tasks/search?q=${searchTerm}`,
  },
  // task components
  TASK_COMPONENTS: {
    BASE: "/api/task-components",
    BY_ID: (id: number) => `/api/task-components/${id}`,
    BY_TASK_ID: (taskId: number) => `/api/task-components/task/${taskId}`,
  },
  // Users
  USERS: {
    BASE: "/api/users",
  },
  // settings
  SETTINGS: {
    BASE: "/api/settings",
  },
  // Pomodoro Sessions
  POMODORO_SESSION: {
    BASE: "/api/pomodoro-session",
    BY_ID: (id: number) => `/api/pomodoro-session/${id}`,
    LINK_TASK: "/api/pomodoro-session/link-task",
  },
} as const;
