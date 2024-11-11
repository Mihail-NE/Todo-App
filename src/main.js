import "./styles/main.css";
import { FILTERS } from "./js/constants/constants";
import {
    getTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    toggleAllTodos,
    clearCompleted,
} from "./js/store/todos";
import { createTodoItem } from "./js/components/todoItem";
import { createTodoForm } from "./js/components/todoForm";
import { createTodoFilters } from "./js/components/todoFilters";

export let todos = getTodos();
let currentFilter = FILTERS.ALL;

const todoFilters = createTodoFilters({
    onFilterChange: (filter) => {
        currentFilter = filter;
        renderTodos();
    },
    onClearCompleted: () => {
        todos = clearCompleted(todos);
        renderTodos();
    },
});

const renderTodos = () => {
    const todoList = document.getElementById("list");
    const filters = document.getElementById("todo-filters");
    const toggleIcon = document.getElementById("toggle-icon");

    const hasItems = todos.length > 0;
    filters.style.display = hasItems ? "flex" : "none";
    toggleIcon.style.display = hasItems ? "block" : "none";
    todoList.style.display = hasItems ? "flex" : "none";

    const allCompleted = todos.every((todo) => todo.completed);
    toggleIcon.classList.toggle("all-completed", allCompleted);

    todoList.innerHTML = "";
    todos
        .filter((todo) => {
            if (currentFilter === FILTERS.ACTIVE) return !todo.completed;
            if (currentFilter === FILTERS.COMPLETED) return todo.completed;
            return true;
        })
        .forEach((todo, index) => {
            const todoItem = createTodoItem(todo, index, {
                onToggle: (i) => {
                    todos = toggleTodo(todos, i);
                    renderTodos();
                },
                onDelete: (i) => {
                    todos = deleteTodo(todos, i);
                    renderTodos();
                },
                onEdit: (i, newText) => {
                    todos = editTodo(todos, i, newText);
                    renderTodos();
                },
            });
            todoList.appendChild(todoItem);
        });


    const activeCount = todos.filter((todo) => !todo.completed).length;
    todoFilters.updateCount(activeCount);
    todoFilters.toggleClearCompleted();
};

const { toggleIcon } = createTodoForm((text) => {
    todos = addTodo(todos, text);
    renderTodos();
});

toggleIcon.addEventListener("click", () => {
    todos = toggleAllTodos(todos);
    renderTodos();
});

renderTodos();
