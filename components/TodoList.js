export function TodoList({ todos, onDelete }) {
    return (
        <div className='TodoList'>
            <h3>Todo List</h3>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} onDelete={onDelete} />
            ))}
        </div>
    );
}

export function Todo({ todo, onDelete }) {
    function handleDelete() {
        onDelete(todo.id);
    }

    return (
        <div className='Todo'>
            <div>{todo.title}</div>
            <button className='Todo__deleteButton' onClick={handleDelete}>
                X
            </button>
        </div>
    );
}
