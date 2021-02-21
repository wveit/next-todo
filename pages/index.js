import Head from 'next/head';
import { useState, useEffect } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import { TodoList } from '../components/TodoList';
import { getTodos, postTodo, deleteTodo } from '../util/todos-client';
import { SignInForm } from '../components/SignInForm';
import { RegisterForm } from '../components/RegisterForm';
import { AuthButtons } from '../components/AuthButtons';

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
    const [user, setUser] = useState(null);

    return (
        <>
            <Head>
                <title>Todo App</title>
            </Head>
            <header>
                <h1>Todo App</h1>
                <AuthButtons
                    username={user && user.username}
                    onSignIn={() => setAuthForm('SIGN_IN')}
                    onRegister={() => setAuthForm('REGISTER')}
                    onSignOut={() => setUser(null)}
                />
            </header>
            <main>
                {authForm === 'SIGN_IN' ? (
                    <SignInForm
                        onCancel={() => setAuthForm(null)}
                        onSuccessfulSignIn={(user) => setUser(user)}
                    />
                ) : null}
                {authForm === 'REGISTER' ? (
                    <RegisterForm
                        onCancel={() => setAuthForm(null)}
                        onSuccessfulRegister={(user) => setUser(user)}
                    />
                ) : null}
                <NewTodoForm onNewTodo={handleNewTodo} />
                <TodoList todos={todos} onDelete={handleDeleteTodo} />
            </main>
        </>
    );
}
