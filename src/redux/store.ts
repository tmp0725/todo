import { combineReducers, compose, legacy_createStore } from "@reduxjs/toolkit";
import { todosReducer } from "./reducer";

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const composeReduxDevToolsEnhancers =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export type TodosState = ReturnType<typeof store.getState>;

export const store = legacy_createStore(
  combineReducers({
    todos: todosReducer,
  }),
  composeReduxDevToolsEnhancers()
);
