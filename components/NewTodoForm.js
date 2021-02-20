import { useState } from 'react';

export function NewTodoForm({ onNewTodo }) {
    const [title, setTitle] = useState('');

    function handleKeyUp(event) {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleSubmit() {
        onNewTodo && onNewTodo({ title });
        setTitle('');
    }

    return (
        <div className='NewTodoForm'>
            <h3>New Todo</h3>
            <input
                type='text'
                name='title'
                placeholder='Enter title here'
                onChange={handleTitleChange}
                onKeyUp={handleKeyUp}
                value={title}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
