export async function getTodos(token) {
    const response = await fetch('/api/todos', {
        headers: { 'x-auth-token': token },
    });
    return await response.json();
}

export async function postTodo(todo, token) {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
}

export async function deleteTodo(todoId, token) {
    const response = await fetch(`/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token },
    });
    return await response.json();
}

export async function updateTodo(todoId, changes, token) {
    const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
        body: JSON.stringify({ ...changes, id: todoId }),
    });
    return await response.json();
}
