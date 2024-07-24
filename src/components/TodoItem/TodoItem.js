import "./TodoItem.css";
import { useRef, useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import useOnClickOutside from "../../../src/utils/useOnClickOutside";

function TodoItem({ item, setTodoList, todoList }) {
  const [editItemId, setEditItemId] = useState(null);

  // function to delete item
  const deleteItem = (id) => {
    const updatedTodoList = todoList.filter((a) => a.id !== id);
    setTodoList(updatedTodoList);
    updatedLocalStorage(updatedTodoList);
  };

  // function to toggle item completion
  const toggleItem = (id) => {
    const updatedTodoList = todoList.map((a) =>
      a.id === id ? { ...a, completed: !a.completed } : a
    );
    setTodoList(updatedTodoList);
    updatedLocalStorage(updatedTodoList);
  };

  // function to edit item
  const editItem = (e) => {
    console.log(e.target.value);
    updatedLocalStorage(todoList);
    setEditItemId(null);
  };

  const updatedLocalStorage = (value) => {
    localStorage.setItem("todoList", JSON.stringify(value));
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => setEditItemId(null));

  return (
    <div className="TodoItem" ref={editItemId === item.id ? ref : null}>
      <div className="TodoItemText">
        <div
          className={item.completed ? "FilledBullet" : "Bullet"}
          onClick={() => toggleItem(item.id)}
        />
        {editItemId === item.id ? (
          <input
            className="TodoItemTextInput"
            type="text"
            value={item.text}
            onChange={(e) =>
              setTodoList(
                todoList.map((element) =>
                  element.id === editItemId
                    ? { ...element, text: e.target.value }
                    : element
                )
              )
            }
            onKeyDown={(e) => e.key === "Enter" && editItem(e)}
          />
        ) : (
          <p className={item.completed ? "text-strikethrough" : ""}>
            {item.text}
          </p>
        )}
      </div>
      <div className="TodoItemActions">
        <MdEdit
          id={editItemId === item.id ? "edit" : ""}
          onClick={(e) =>
            editItemId === item.id
              ? setEditItemId(null)
              : setEditItemId(item.id)
          }
          size={20}
        />
        <MdDeleteOutline onClick={(e) => deleteItem(item.id)} size={20} />
      </div>
    </div>
  );
}

export default TodoItem;
