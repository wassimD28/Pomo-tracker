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
  // Users
  USERS: {
    BASE: "/api/users",
  },
} as const;
