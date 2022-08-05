export type Todo = {
  title: string;
  text: string;
  priority: string;
  closingDate: string;
};

export type Todos = {
  id: number;
  title: string;
  text: string;
  priority: string;
  completed: boolean;
  createDate: string;
  closingDate: string;
};
