const { useState } = React;
import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  const [todoToRemove, setTodoToRemove] = useState(null);

  function confirmRemove(todo) {
    setTodoToRemove(todo);
  }

  function handleRemove() {
    onRemoveTodo(todoToRemove._id);
    setTodoToRemove(null);
  }

  function handleCancel() {
    setTodoToRemove(null);
  }

  return (
    <section className="todo-list">
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} style={{ backgroundColor: todo.color }}>
            <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
            <section>
              <button
                onClick={() => {
                  confirmRemove(todo);
                }}
              >
                Remove
              </button>
              <button>
                <Link to={`/todo/${todo._id}`}>Details</Link>
              </button>
              <button>
                <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
              </button>
            </section>
          </li>
        ))}
      </ul>

      {todoToRemove && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to remove "{todoToRemove.txt}"?</p>
            <button onClick={handleRemove}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </div>
      )}
    </section>
  );
}
