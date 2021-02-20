export async function getTodos() {
    const response = await fetch('/api/todos');
    return await response.json();
}

export async function postTodo(todo) {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
}
