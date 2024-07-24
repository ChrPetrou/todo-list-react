import "./App.css";
import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem/TodoItem";
function App() {
  const [todoList, setTodoList] = useState([]);
  const tab = ["All", "Active", "Completed"];
  const [tabSelected, setTabSelected] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("todoList") !== null) {
      setTodoList(JSON.parse(localStorage.getItem("todoList")));
    }
  }, []);

  const addItem = (e) => {
    const updatedTodoList = [
      ...todoList,
      {
        id: Math.random().toString(36).substring(2),
        text: e.target.value,
        completed: false,
      },
    ];
    setTodoList(updatedTodoList);
    updatedLocalStorage(updatedTodoList);
    e.target.value = "";
  };

  const updatedLocalStorage = (value) => {
    localStorage.setItem("todoList", JSON.stringify(value));
  };

  return (
    <div className="App">
      <div className="AppInner">
        <div className="TodoContainer ">
          <div className="TodoHeader">
            <h1>To Do List</h1>
            <div className="TodoTabs">
              <p>{todoList.length} tasks</p>
              {tab.map((a, i) => (
                <span
                  key={i}
                  className={tabSelected === i ? "ActiveTab" : ""}
                  onClick={(e) => setTabSelected(i)}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <div className="TodoInput">
            <input
              type="text"
              placeholder="Add a new task..."
              onKeyDown={(e) =>
                e.key === "Enter" && e.target.value && addItem(e)
              }
            />
          </div>
          <div className="TodoList">
            {todoList.filter((a) =>
              tabSelected === 2
                ? a.completed
                : tabSelected === 1
                ? !a.completed
                : a
            ).length === 0 ? (
              <h2>Not found a task</h2>
            ) : (
              todoList
                .filter((a) =>
                  tabSelected === 2
                    ? a.completed
                    : tabSelected === 1
                    ? !a.completed
                    : a
                )
                .map((item) => (
                  <TodoItem
                    item={item}
                    setTodoList={setTodoList}
                    todoList={todoList}
                    key={item.id}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
