import { useState, useEffect } from "react";
import TodoItem from "./TodoItems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let updateTodoId = "todo0";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState("");
  const [updateTodo, setUpdateTodo] = useState(false);

  const todoValueChanged = (event) => {
    const { value } = event.target;
    setTodoInputValue(value);
  };

  useEffect(() => {
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      setTodoList(JSON.parse(savedTodoList));
    }
  }, []);

  const saveInLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    toast("Todos saved in your Local-Storage", {
      autoClose: 2000,
    });
  };

  const uniqueNo = () => {
    const todoLength = todoList.length;
    if (!todoLength) {
      return 1;
    } else {
      return todoList[todoLength - 1].uniqueNo + 1;
    }
  };

  const onAddTodo = () => {
    if (todoInputValue === "") {
      alert("Enter Valid Text");
      return;
    }

    if (!updateTodo) {
      console.log(123);
      const newTodo = {
        text: todoInputValue,
        uniqueNo: uniqueNo(),
        isChecked: false,
      };

      setTodoList([...todoList, newTodo]);
      setTodoInputValue("");
    } else {
      const todoIndex = todoList.findIndex(
        (todo) => "todo" + todo.uniqueNo === updateTodoId
      );
      todoList[todoIndex].text = todoInputValue;
      console.log(todoList);
      setTodoList([...todoList]);
      setTodoInputValue("");
      setUpdateTodo(false);
    }
  };

  const onDeleteTodo = (todoId) => {
    const updatedTodoList = todoList.filter(
      (todo) => "todo" + todo.uniqueNo !== todoId
    );
    setTodoList(updatedTodoList);
  };

  const onTodoStatusChange = (todoId) => {
    const updatedTodoList = todoList.map((todo) => {
      if ("todo" + todo.uniqueNo === todoId) {
        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const onUpdateTodo = (todoId) => {
    updateTodoId = todoId;
    const todoToBeUpdated = todoList.find(
      (todo) => "todo" + todo.uniqueNo === todoId
    );
    setUpdateTodo(true);
    setTodoInputValue(todoToBeUpdated.text);
  };

  useEffect(() => {
    document.getElementById("todoUserInput").focus();
  });

  return (
    <div>
      <div id="todoItemsContainer">
        <input
          type="text"
          id="todoUserInput"
          className="todo-user-input"
          placeholder="What needs to be done?"
          value={todoInputValue}
          onChange={todoValueChanged}
          onKeyDown={(e) => (e.key === "Enter" ? onAddTodo() : null)}
        />

        <button className="button" onClick={onAddTodo}>
          {updateTodo ? "Update Todo" : "Add Todo"}
        </button>
        <h1 className="todo-items-heading">
          My <span className="todo-items-heading-subpart">Tasks</span>
        </h1>
        <ul className="todo-items-container">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.uniqueNo}
              todo={todo}
              onDeleteTodo={onDeleteTodo}
              onTodoStatusChange={onTodoStatusChange}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
        <button className="button" onClick={saveInLocalStorage}>
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoApp;
