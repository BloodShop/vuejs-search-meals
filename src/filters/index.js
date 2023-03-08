export const truncateWords = (str, count) =>
    str ? str.split(" ").slice(0, count).join(" ") : str;
