export function TodoList({ todos, onDelete, onDone }) {
    return (
        <div className='TodoList'>
            <h3>Todo List</h3>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onDone={onDone}
                />
            ))}
        </div>
    );
}

export function Todo({ todo, onDelete, onDone }) {
    function handleDelete() {
        onDelete(todo.id);
    }

    function handleDone() {
        onDone(todo.id, !todo.isDone);
    }

    return (
        <div className='Todo'>
            <input
                type='checkbox'
                checked={!!todo.isDone}
                onClick={handleDone}
                className='Todo__doneButton'
            />
            <div className='Todo__title'>{todo.title}</div>
            <button className='Todo__deleteButton' onClick={handleDelete}>
                X
            </button>
        </div>
    );
}
