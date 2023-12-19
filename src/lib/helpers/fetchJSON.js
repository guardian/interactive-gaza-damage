export async function fetchJSON(path) {
    const response = await fetch(path);
    const JSON = await response.json();
    return JSON;
}