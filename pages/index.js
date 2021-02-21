import Head from 'next/head';
import { useState, useEffect } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import { TodoList } from '../components/TodoList';
import { getTodos, postTodo, deleteTodo } from '../util/todos-client';

function useTodos() {
    const [todos, setTodos] = useState([]);

    async function handleNewTodo(todo) {
        const todos = await postTodo(todo);
        if (!todos.errors) setTodos(todos);
    }

    async function handleDeleteTodo(todoId) {
        const todos = await deleteTodo(todoId);
        if (!todos.errors) setTodos(todos);
    }

    useEffect(() => {
        (async function () {
            const todos = await getTodos();
            if (!todos.errors) setTodos(todos);
        })();
    }, []);

    return { todos, handleNewTodo, handleDeleteTodo };
}

export default function Home() {
    const { todos, handleNewTodo, handleDeleteTodo } = useTodos();
    const [authForm, setAuthForm] = useState(null);

    return (
        <>
            <Head>
                <title>Todo App</title>
            </Head>
            <header>
                <h1>Todo App</h1>
                <div>
                    <button onClick={() => setAuthForm('sign-in')}>
                        Sign In
                    </button>
                    <button onClick={() => setAuthForm('register')}>
                        Register
                    </button>
                </div>
            </header>
            <main>
                <p>Auth Form: {authForm}</p>
                <NewTodoForm onNewTodo={handleNewTodo} />
                <TodoList todos={todos} onDelete={handleDeleteTodo} />
            </main>
        </>
    );
}
