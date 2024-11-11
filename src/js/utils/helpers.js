export const isValidText = (text) => text && text.trim().length > 0;

export const pluralize = (count, word) =>
    `${count} ${word}${count !== 1 ? "s" : ""}`;
