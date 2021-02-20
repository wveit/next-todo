export function TodoList({ todos }) {
    return (
        <div className='TodoList'>
            <h3>Todo List</h3>
            {todos.map((todo) => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
}

TodoList.defaultProps = {
    todos: [],
};
