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
  
} as const;
