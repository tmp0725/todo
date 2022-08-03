import { useEffect, useState } from "react";

type Todos = {
  id: number;
  text: string;
  completed: boolean;
};

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
      completed: false,
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

  const handleCompleted = (id: number, completed: boolean): void => {
    const completedTodos: Todos[] = todos.map((todo: Todos): Todos => {
      if (todo.id === id) {
        todo.completed = !completed;
      }
      return todo;
    });
    setTodos(completedTodos);
  };

  const handleDelete = (id: number): void => {
    const deleteTodos: Todos[] = todos.filter(
      (todo: Todos): boolean => todo.id !== id
    );
    setTodos(deleteTodos);
  };

  const handleDeleteAllCompleted = (): void => {
    const deleteAllCompleted: Todos[] = todos.filter(
      (todo: Todos): boolean => todo.completed === false
    );
    setTodos(deleteAllCompleted);
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
            <li key={i}>
              <input type="checkbox" />
              <span>{todo.text}</span>
            </li>
          )
        )}
      </ul>

      <ul>
        {todos.map(
          (todo: Todos): JSX.Element => (
            <li key={todo.id}>
              <input
                type="checkbox"
                onClick={(): void => handleCompleted(todo.id, todo.completed)}
              />
              <input
                type="text"
                value={todo.text}
                disabled={todo.completed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  handleEditChange(todo.id, e.target.value)
                }
              />
              <button onClick={(): void => handleDelete(todo.id)}>削除</button>
            </li>
          )
        )}
      </ul>
      <button onClick={handleDeleteAllCompleted}>
        完了済みのTodoを全て削除
      </button>
    </>
  );
};
