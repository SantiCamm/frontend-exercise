interface Category {
  color: string;
  id: string;
  name: string;
}

interface Task {
  completed: boolean;
  description: string;
  id: string;
  title: string;
  category_id: string;
}

interface NewTaskFormError {
  title?: string;
  description?: string;
  category?: string;
}

export type { Category, Task, NewTaskFormError };
