// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { addTodo, deleteTodo, getTitle } from "./redux/action";
// import { TodosState } from "./redux/store";
// import { Todo } from "./types/type";

// export const TodoDetails = (): JSX.Element => {
//   const [todo, setTodo] = useState<Todo>({ title: "", text: "" });
//   const dispatch = useDispatch();
//   const selector = useSelector((state: TodosState) => state.todos);

//   let a = selector.length;

//   // const text = useSelector((state: TodosState) =>
//   //   state.todos.filter((todo) => todo.text === todo.text)
//   // );

//   const handleContentChange = (e: any) => {
//     e.target.value;
//   };

//   const editTodo = () => {
//     alert("Todoを編集しました");
//     dispatch(addTodo({ title: todo.title, text: todo.text }));
//     //   dispatch(addTodo({title: }));
//   };

//   return (
//     <>
//       <h2>Todoリストの詳細</h2>
//       <Link to="/">
//         <h3>← 戻る</h3>
//       </Link>
//       <input
//         type="text"
//         placeholder="タイトル"
//         // value={dispatch(getTitle(title))}
//       />
//       <div>
//         <textarea
//           placeholder="内容"
//           cols={22}
//           rows={10}
//           // value={text}
//           onChange={handleContentChange}
//         ></textarea>
//         <button onClick={editTodo}>編集</button>
//       </div>
//     </>
//   );
// };

import React from "react";

function TodoDetails() {
  return <div>TodoDetails</div>;
}

export default TodoDetails;
