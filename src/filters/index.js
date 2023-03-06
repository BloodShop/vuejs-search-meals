export function truncateWords(str, count) {
    return str ? str.split(" ").slice(0, count).join(" ") : str;
}
