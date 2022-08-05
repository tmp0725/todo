import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTodo, deleteTodo, getTitle } from "./redux/action";
import { TodosState } from "./redux/store";
import { Todo, Todos } from "./types/type";

export const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const selector = useSelector((state: TodosState) => state.todos);

  const [todo, setTodo] = useState<Todo>({
    title: "",
    text: "",
    priority: "",
    closingDate: "",
  });
  const [todos, setTodos] = useState<Todos[]>([]);
  const [fetchTodos, setFetchTodos] = useState<string[]>([]);

  console.log(selector.map((todo) => todo));

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      await fetch("http://127.0.0.1:5173/src/todos.json")
        .then((res: Response): Promise<any> => {
          return res.json();
        })
        .then((data): void => setFetchTodos(data));
    };
    fetchData();
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

  const handleCompleted = (id: number, completed: boolean) => {
    const completedTodos = todos.map((todo: Todos) => {
      if (todo.id === id) {
        todo.completed = !completed;
      }
      return todo;
    });
    setTodos(completedTodos);
  };

  // const handleDeleteAllCompleted = () => {
  //   const deleteAllCompleted = todos.filter(
  //     (todo: Todos): boolean => todo.completed === false
  //   );
  //   setTodos(deleteAllCompleted);
  // };

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
          <select onChange={handleSelectChange}>
            <option value="">優先度</option>
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
          <input type="date" onChange={handleDateChange}></input>
          <input type="submit" value="追加" />
        </div>
      </form>
      <ul>
        {fetchTodos.map(
          (todo: any, i: number): JSX.Element => (
            <li key={i}>
              <input type="checkbox" />
              <span>{todo.text}</span>
            </li>
          )
        )}
      </ul>
      <span>
        <button>優先度</button>
        <button>作成日</button>
        <button>締切日</button>
      </span>
      <ul>
        {selector.map(
          (todo): JSX.Element => (
            <li key={todo.id}>
              <input
                type="checkbox"
                onClick={(): void => handleCompleted(todo.id, todo.completed)}
              />
              <Link to="/todo-detail">
                <span onClick={() => dispatch(getTitle(todo.title))}>
                  {todo.title}
                </span>
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
          )
        )}
      </ul>
      {/* <button onClick={handleDeleteAllCompleted}>
        完了済みのTodoを全て削除
      </button> */}
    </>
  );
};

// const handleEditChange = (id: number, text: string) => {
//   const editTodos = todos.map((todo: Todos) => {
//     if (todo.id === id) {
//       todo.text = text;
//     }
//     return todo;
//   });
//   setTodos(editTodos);
// };

//       <input
//         type="checkbox"
//         onClick={(): void => handleCompleted(todo.id, todo.completed)}
//       />
//       <input
//         type="text"
//         value={todo.text}
//         disabled={todo.completed}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
//           handleEditChange(todo.id, e.target.value)
