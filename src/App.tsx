import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTodosRequest,
  getTodosSuccess,
  getTodosFailure,
  addTodo,
  deleteTodo,
  todoCompletedChange,
  priorityChange,
  deleteAllTodosCompleted,
  getTodos,
} from "./redux/action";
import { TodosState } from "./redux/store";
import { Todo } from "./types/type";

export const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const selector = useSelector((state: TodosState) => state.todos);

  const [todo, setTodo] = useState<Todo>({
    title: "",
    text: "",
    priority: "",
    closingDate: "",
  });

  useEffect(() => {
    getTodos();

    // const getTodosAction = () => {
    //   return (dispatch: any) => {
    //     dispatch(getTodosRequest());
    //     return axios
    //       .get(`http://127.0.0.1:5173/src/todos.json`)
    //       .then((res) => dispatch(getTodosSuccess(res.data)))
    //       .catch((err) => dispatch(getTodosFailure(err)));
    //   };
    // };
    // getTodosAction();
  }, []);

  const handleTitleChange = (e: any) => {
    setTodo({ ...todo, title: e.target.value });
  };

  const handleTextChange = (e: any) => {
    setTodo({ ...todo, text: e.target.value });
  };

  const handleSelectChange = (e: any) => {
    setTodo({ ...todo, priority: e.target.value });
  };

  const handleDateChange = (e: any) => {
    setTodo({ ...todo, closingDate: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title) return;
    dispatch(
      addTodo({
        title: todo.title,
        text: todo.text,
        priority: todo.priority,
        closingDate: todo.closingDate,
      })
    );
    setTodo({ ...todo, title: "", text: "" });
  };

  return (
    <>
      <h2>Todoリスト</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タイトル"
          value={todo.title}
          onChange={handleTitleChange}
        />
        <div>
          <textarea
            placeholder="内容"
            cols={22}
            rows={10}
            value={todo.text}
            onChange={handleTextChange}
          ></textarea>
          <span>
            <span>優先度:</span>
            <select onChange={handleSelectChange}>
              <option value=""></option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </span>
          <span>
            <span>締切日:</span>
            <input type="date" onChange={handleDateChange}></input>
          </span>
          <input type="submit" value="追加" />
        </div>
      </form>
      {/* <ul>
        {fetchTodos.map(
          (todo: any, i: number): JSX.Element => (
            <li key={i}>
              <input type="checkbox" />
              <span>{todo.text}</span>
            </li>
          )
        )}
      </ul> */}
      <span>
        <button onClick={() => dispatch(priorityChange(todo.priority))}>
          優先度
        </button>
        <button>作成日</button>
        <button>締切日</button>
      </span>
      <h3>未完了のTodoリスト</h3>
      <ul>
        {selector
          .filter((todo) => todo.completed === false)
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                onClick={() =>
                  dispatch(todoCompletedChange(todo.id, todo.completed))
                }
              />
              <Link to="/todo-detail">
                <span>{todo.title}</span>
              </Link>
              <span> {todo.text}</span>
              <p></p>
              <span>優先度:{todo.priority} </span>
              <span>作成日:{todo.createDate} </span>
              <span>締切日:{todo.closingDate}</span>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>
                削除
              </button>
              <p></p>
            </li>
          ))}
      </ul>
      <h3>完了したTodoリスト</h3>
      {selector
        .filter((todo) => todo.completed === true)
        .map((todo) => (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <span> {todo.text}</span>
          </div>
        ))}
      <button onClick={() => dispatch(deleteAllTodosCompleted())}>
        完了済みのTodoを全て削除
      </button>
    </>
  );
};
