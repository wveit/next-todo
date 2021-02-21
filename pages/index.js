import Head from 'next/head';
import { useState, useEffect } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import { TodoList } from '../components/TodoList';
import { getTodos, postTodo, deleteTodo } from '../util/todos-client';

export default function Home() {
    const [todos, setTodos] = useState([]);

    async function handleNewTodo(todo) {
        const todos = await postTodo(todo);
        if (!todos.errors) setTodos(todos);
    }

    async function handleDelete(todoId) {
        const todos = await deleteTodo(todoId);
        if (!todos.errors) setTodos(todos);
    }

    useEffect(() => {
        (async function () {
            const todos = await getTodos();
            if (!todos.errors) setTodos(todos);
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Todo App</title>
            </Head>
            <NewTodoForm onNewTodo={handleNewTodo} />
            <TodoList todos={todos} onDelete={handleDelete} />
        </>
    );
}
