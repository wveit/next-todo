import { useState } from 'react';

export function NewTodoForm({ onNewTodo }) {
    const [title, setTitle] = useState('');

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleNewTodo() {
        onNewTodo && onNewTodo(title);
    }

    return (
        <div className='NewTodoForm'>
            <h3>New Todo</h3>
            <input
                type='text'
                name='title'
                placeholder='Enter title here'
                onChange={handleTitleChange}
            />
            <button onClick={handleNewTodo}>Submit</button>
        </div>
    );
}
