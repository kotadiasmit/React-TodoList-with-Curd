import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

const TodoItem = (props) => {
  const { todo, onDeleteTodo, onTodoStatusChange, onUpdateTodo } = props;
  const { uniqueNo, isChecked, text } = todo;
  const todoId = "todo" + uniqueNo;
  const checkboxId = "checkbox" + uniqueNo;

  const todoStatusChanged = () => {
    onTodoStatusChange(todoId);
  };

  const deleteTodoClicked = () => {
    onDeleteTodo(todoId);
  };

  const updateTodoClicked = () => {
    onUpdateTodo(todoId);
  };

  return (
    <li
      className="todo-item-container d-flex flex-row align-items-center"
      id={todoId}
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={isChecked}
        onChange={todoStatusChanged}
        className="checkbox-input"
        title="check/uncheck todo"
      />
      <div
        className={`label-container d-flex flex-row ${
          isChecked ? "label-container-checked" : ""
        }`}
      >
        <label
          htmlFor={checkboxId}
          className={`checkbox-label ${isChecked ? "checked" : ""}`}
        >
          {text}
        </label>
        <div className="delete-icon-container d-flex align-items-center">
          <BiEdit
            className="icon"
            title="edit todo"
            onClick={updateTodoClicked}
          />
          <RiDeleteBinLine
            className="icon"
            title="delete todo"
            onClick={deleteTodoClicked}
          />
        </div>
      </div>
    </li>
  );
};
export default TodoItem;
