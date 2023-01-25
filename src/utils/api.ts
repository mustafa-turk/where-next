export function generateSuggestions(selected: string[]) {
  return fetch("api/generate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selected }),
  })
    .then((res) => res.json())
    .then((data) => JSON.parse(data.suggestions));
}
