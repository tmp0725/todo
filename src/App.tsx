import { useEffect, useState } from "react";

type Todos = {
  id: number;
  text: string;
};

// const TODOS = [
//   {
//     id: 0,
//     text: "買い物に行く",
//   },
//   {
//     id: 1,
//     text: "街に出かける",
//   },
//   {
//     id: 2,
//     text: "散歩に出かける",
//   },
// ];

export const App = (): JSX.Element => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const [fetchTodos, setFetchTodos] = useState<string[]>([]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!text) return;
    const newTodos: Todos = {
      id: todos.length,
      text: text,
    };
    setTodos([newTodos, ...todos]);
    setText("");
  };

  const handleEditChange = (id: number, text: string): void => {
    const editTodos: Todos[] = todos.map((todo: Todos): Todos => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    setTodos(editTodos);
  };

  const handleDelete = (id: number): void => {
    const deleteTodos: Todos[] = todos.filter(
      (todo: Todos): boolean => todo.id !== id
    );
    setTodos(deleteTodos);
  };

  return (
    <>
      <h2>Todoリスト</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleInputChange} />
        <input type="submit" value="追加" />
      </form>

      <ul>
        {fetchTodos.map(
          (todo: any, i: number): JSX.Element => (
            <li key={i}>{todo.text}</li>
          )
        )}
      </ul>

      <ul>
        {todos.map(
          (todo: Todos): JSX.Element => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  handleEditChange(todo.id, e.target.value)
                }
              />
              <button onClick={(): void => handleDelete(todo.id)}>削除</button>
            </li>
          )
        )}
      </ul>
    </>
  );
};
