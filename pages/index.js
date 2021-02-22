import Head from 'next/head';
import { useState, useEffect } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import { TodoList } from '../components/TodoList';
import {
    getTodos,
    postTodo,
    deleteTodo,
    updateTodo,
} from '../util/todos-client';
import { SignInForm } from '../components/SignInForm';
import { RegisterForm } from '../components/RegisterForm';
import { AuthButtons } from '../components/AuthButtons';

function useTodos(token) {
    const [todos, setTodos] = useState([]);

    async function handleNewTodo(todo) {
        if (!token) return;
        const todos = await postTodo(todo, token);
        if (!todos.errors) setTodos(todos);
    }

    async function handleDeleteTodo(todoId) {
        if (!token) return;
        const todos = await deleteTodo(todoId, token);
        if (!todos.errors) setTodos(todos);
    }

    async function handleTodoDone(todoId, isDone) {
        if (!token) return;
        const oldTodo = todos.find((todo) => todo.id === todoId);
        if (!oldTodo) return;
        const newTodo = { ...oldTodo, isDone };
        const updatedTodos = await updateTodo(newTodo, token);
        if (!todos.errors) setTodos(updatedTodos);
    }

    useEffect(() => {
        (async function () {
            if (!token) return;
            const todos = await getTodos(token);
            if (!todos.errors) setTodos(todos);
        })();
    }, [token]);

    return { todos, handleNewTodo, handleDeleteTodo, handleTodoDone };
}

export default function Home() {
    const [authForm, setAuthForm] = useState(null);
    const [user, setUser] = useState(null);
    const token = user && user.token;
    const { todos, handleNewTodo, handleDeleteTodo, handleTodoDone } = useTodos(
        token
    );

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
                {user ? (
                    <>
                        <NewTodoForm onNewTodo={handleNewTodo} />
                        <TodoList
                            todos={todos}
                            onDelete={handleDeleteTodo}
                            onDone={handleTodoDone}
                        />
                    </>
                ) : null}
            </main>
        </>
    );
}
