export function TodoList({ title, todos, onDelete, onUpdate }) {
    return (
        <div className='TodoList'>
            <h3>{title}</h3>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export function Todo({ todo, onDelete, onUpdate }) {
    function handleDelete() {
        onDelete(todo.id);
    }

    function handleDone() {
        if (todo.dateCompleted) onUpdate(todo.id, { dateCompleted: null });
        else onUpdate(todo.id, { dateCompleted: Date.now() });
    }

    return (
        <div className='Todo'>
            <input
                type='checkbox'
                checked={!!todo.dateCompleted}
                onChange={handleDone}
                className='Todo__doneButton'
            />
            <div className='Todo__title'>{todo.title}</div>
            <button className='Todo__deleteButton' onClick={handleDelete}>
                X
            </button>
        </div>
    );
}
