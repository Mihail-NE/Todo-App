import { FILTERS } from "../constants/constants";
import { pluralize } from "../utils/helpers";
import { todos } from "../../main";

export const createTodoFilters = ({ onFilterChange, onClearCompleted }) => {
    const filters = document.querySelectorAll(".filter-btn");
    const clearCompletedBtn = document.getElementById("clear-completed");
    const todoCount = document.getElementById("todo-count");

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            filters.forEach((f) => f.classList.remove("active"));
            filter.classList.add("active");
            onFilterChange(filter.dataset.filter);
        });
    });

    clearCompletedBtn.addEventListener("click", onClearCompleted);

    const updateCount = (count) => {
        todoCount.textContent = pluralize(count, "item") + " left";
    };

    const toggleClearCompleted = () => {
        const hasCompleted = todos.some((todo) => todo.completed);
        clearCompletedBtn.classList.toggle("hide", !hasCompleted);
    };

    return {
        updateCount,
        toggleClearCompleted
    };
};