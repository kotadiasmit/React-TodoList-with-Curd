import "./App.css";
import TodoApp from "./TodoApp";

function App() {
  return (
    <div className="todos-bg-container d-flex flex-row">
      <div className="container">
        <h1 className="todos-heading">Todos</h1>
        <h1 className="create-task-heading">
          Create <span className="create-task-heading-subpart">Task</span>
        </h1>
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
