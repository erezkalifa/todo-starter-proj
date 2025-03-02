const { useEffect } = React;
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js";
import { loadTodos, removeTodo } from "../store/actions/todo.actions.js";

const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoIndex() {
  const todos = useSelector((storeState) => storeState.todoModule.todos);
  const filterBy = useSelector((storeState) => storeState.todoModule.filterBy);
  const isLoading = useSelector(
    (storeState) => storeState.todoModule.isLoading
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams);

  const dispatch = useDispatch();

  useEffect(() => {
    loadTodos().catch(() => showErrorMsg("Cannot load todos"));
    setSearchParams(filterBy);
  }, [filterBy]);

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy });
  }

  function onRemoveTodo(todoId) {
    removeTodo(todoId)
      .then(() => showSuccessMsg("Todo removed"))
      .catch(() => showErrorMsg("Cannot load todo's"));
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone };
    saveTodo(todoToSave)
      .then((savedTodo) => {
        showSuccessMsg(
          `Todo is ${savedTodo.isDone ? "done" : "back on your list"}`
        );
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot toggle todo " + todo._id);
      });
  }

  if (!todos) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: "60%", margin: "auto" }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  );
}
