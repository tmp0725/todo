import { Todo } from "../types/type";

export const ADD_TODO = "ADD_TODO";
export const addTodo = ({ title, text, priority, closingDate }: Todo) => {
  return {
    type: ADD_TODO,
    payload: {
      title,
      text,
      priority,
      closingDate,
    },
  } as const;
};

export const DELETE_TODO = "DELETE_TODO";
export const deleteTodo = (id: number) => {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  } as const;
};

export const EDIT_TODO = "EDIT_TODO";
export const editTodo = (id: number) => {
  return {
    type: EDIT_TODO,
    id,
  };
};

export const GET_TITLE = "GET_TITLE";
export const getTitle = (title: string) => {
  return {
    type: GET_TITLE,
    title,
  } as const;
};
