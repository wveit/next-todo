import Head from 'next/head';
import { useState } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import { TodoList } from '../components/TodoList';

export default function Home() {
    const [todos, setTodos] = useState([]);

    function handleNewTodo(todo) {
        const newTodo = {
            id: Date.now(),
            title: todo,
        };

        setTodos([...todos, newTodo]);
    }

    return (
        <>
            <Head>
                <title>Todo App</title>
            </Head>
            <NewTodoForm onNewTodo={handleNewTodo} />
            <TodoList todos={todos} />
        </>
    );
}
