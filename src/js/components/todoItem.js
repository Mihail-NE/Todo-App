export const createTodoItem = (
    { text, completed },
    index,
    { onToggle, onDelete, onEdit }
) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="todo-text">
          <div class="todo-wrap">
              <input type="checkbox" class="custom-checkbox" ${
                  completed ? "checked" : ""
              }>
              <span class="todo-value ${
                  completed ? "completed" : ""
              }">${text}</span>
          </div>
          <i class="ri-delete-bin-line"></i>
      </div>
  `;

    const checkbox = li.querySelector(".custom-checkbox");
    const deleteBtn = li.querySelector(".ri-delete-bin-line");
    const span = li.querySelector(".todo-value");

    checkbox.addEventListener("change", () => onToggle(index));
    deleteBtn.addEventListener("click", () => onDelete(index));

    span.addEventListener("dblclick", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = text;
        input.className = "edit-input";

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText) {
                onEdit(index, newText);
            }
        };

        input.addEventListener("blur", saveEdit);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") saveEdit();
        });

        span.replaceWith(input);
        input.focus();
    });

    return li;
};
