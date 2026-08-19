export const addItemToServer = async (task, date) => {
  const response = await fetch("http://localhost:3001/api/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });
  if (!response.ok) {
    throw new Error(`Unable to add the todo item (HTTP ${response.status}).`);
  }
  return response.json();
};

export const getItemFromServer = async () => {
  const response = await fetch("http://localhost:3001/api/todo", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Unable to add the todo item (HTTP ${response.status}).`);
  }
  return response.json();
};

export const deleteItem = async (id) => {
    const response = await fetch(`http://localhost:3001/api/todo/${id}`, {method: "DELETE"});
    return response.json();
}

export const markItemCompleted = async (id) => {
    const response = await fetch("http://localhost:3001/api/todo/${id}/completed", {method: "PUT"});
    return response.json();
}