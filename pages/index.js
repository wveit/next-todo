import Head from 'next/head';
import { useEffect } from 'react';
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
import { connect } from 'react-redux';
import { setUser } from '../redux-slices/user';
import { setAuthForm } from '../redux-slices/auth-form';
import { setTodos } from '../redux-slices/todos';

export function Home({
    authForm,
    user,
    setAuthForm,
    setUser,
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleTodoUpdate,
    loadTodos,
}) {
    useEffect(() => {
        if (user) loadTodos();
    }, [user]);

    const categorizedTodos = { active: [], done: [] };
    todos.forEach((todo) => {
        if (todo.dateCompleted) categorizedTodos.done.push(todo);
        else categorizedTodos.active.push(todo);
    });

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
                            title='Active'
                            todos={categorizedTodos.active}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleTodoUpdate}
                        />
                        <TodoList
                            title='Done'
                            todos={categorizedTodos.done}
                            onDelete={handleDeleteTodo}
                            onUpdate={handleTodoUpdate}
                        />
                    </>
                ) : null}
            </main>
        </>
    );
}

function mapStateToProps({ user, authForm, todos }) {
    return {
        user,
        authForm,
        todos,
    };
}

const mapDispatchToProps = {
    setUser,
    setAuthForm,
    handleNewTodo(todo) {
        return async function (dispatch, getState) {
            const token = getState().user.token;
            const todos = await postTodo(todo, token);
            if (!todos.errors) dispatch(setTodos(todos));
        };
    },
    handleDeleteTodo(todoId) {
        return async function (dispatch, getState) {
            const token = getState().user.token;
            const todos = await deleteTodo(todoId, token);
            if (!todos.errors) dispatch(setTodos(todos));
        };
    },
    handleTodoUpdate(todoId, update) {
        return async function (dispatch, getState) {
            const token = getState().user.token;
            const updatedTodos = await updateTodo(todoId, update, token);
            if (!updatedTodos.errors) dispatch(setTodos(updatedTodos));
        };
    },
    loadTodos() {
        return async function (dispatch, getState) {
            const token = getState().user.token;
            const todos = await getTodos(token);
            if (!todos.errors) dispatch(setTodos(todos));
        };
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
