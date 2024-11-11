import { isValidText } from "../utils/helpers";

export const createTodoForm = (onSubmit) => {
    const form = document.getElementById("form");
    const input = document.getElementById("input");
    const toggleIcon = document.getElementById("toggle-icon");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (isValidText(text)) {
            onSubmit(text);
            input.value = "";
        }

    });

    return { form, input, toggleIcon };
};
