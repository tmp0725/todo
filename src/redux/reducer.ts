import { Reducer } from "redux";
import {
  addTodo,
  ADD_TODO,
  deleteTodo,
  DELETE_TODO,
  GET_TITLE,
  getTitle,
} from "./action";
import { Todos } from "../types/type";
import { currentTime } from "../Date/date";

type Action = ReturnType<typeof addTodo | typeof deleteTodo | typeof getTitle>;

export const todosReducer: Reducer<Todos[], Action> = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodos = {
        id: state.length,
        title: action.payload.title,
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
        createDate: currentTime,
        closingDate: action.payload.closingDate,
      };
      return [...state, newTodos];
    }

    case DELETE_TODO: {
      const deleteTodo = state.filter((todo) => todo.id !== action.payload.id);
      return deleteTodo;
    }

    case GET_TITLE: {
      const getTitle = state.filter((todo) => todo.title === action.title);
      return getTitle;
    }
    default: {
      return state;
    }
  }
};
