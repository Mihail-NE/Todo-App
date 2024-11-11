import { STORAGE_KEY } from "../constants/constants";
import { TODO_ACTIONS } from "../constants/actions";

export const getTodos = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

export const saveTodos = (todos) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        return true;
    } catch {
        return false;
    }
};

const todoReducer = (todos, action) => {
    switch (action.type) {
        case TODO_ACTIONS.ADD:
            return [...todos, { text: action.payload, completed: false }];

        case TODO_ACTIONS.DELETE:
            return todos.filter((_, i) => i !== action.payload);

        case TODO_ACTIONS.TOGGLE:
            return todos.map((todo, i) =>
                i === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );

        case TODO_ACTIONS.EDIT:
            return todos.map((todo, i) =>
                i === action.payload.index
                    ? { ...todo, text: action.payload.text }
                    : todo
            );

        case TODO_ACTIONS.TOGGLE_ALL: {
            const allCompleted = todos.every((todo) => todo.completed);
            return todos.map((todo) => ({
                ...todo,
                completed: !allCompleted,
            }));
        }

        case TODO_ACTIONS.CLEAR_COMPLETED:
            return todos.filter((todo) => !todo.completed);

        default:
            return todos;
    }
};

export const addTodo = (todos, text) => {
    const newTodos = todoReducer(todos, {
        type: TODO_ACTIONS.ADD,
        payload: text,
    });
    saveTodos(newTodos);
    return newTodos;
};

export const deleteTodo = (todos, index) => {
    const newTodos = todoReducer(todos, {
        type: TODO_ACTIONS.DELETE,
        payload: index,
    });
    saveTodos(newTodos);
    return newTodos;
};

export const toggleTodo = (todos, index) => {
    const newTodos = todoReducer(todos, {
        type: TODO_ACTIONS.TOGGLE,
        payload: index,
    });
    saveTodos(newTodos);
    return newTodos;
};

export const editTodo = (todos, index, newText) => {
    const newTodos = todoReducer(todos, {
        type: TODO_ACTIONS.EDIT,
        payload: { index, text: newText },
    });
    saveTodos(newTodos);
    return newTodos;
};

export const toggleAllTodos = (todos) => {
    const newTodos = todoReducer(todos, { type: TODO_ACTIONS.TOGGLE_ALL });
    saveTodos(newTodos);
    return newTodos;
};

export const clearCompleted = (todos) => {
    const newTodos = todoReducer(todos, { type: TODO_ACTIONS.CLEAR_COMPLETED });
    saveTodos(newTodos);
    return newTodos;
};
