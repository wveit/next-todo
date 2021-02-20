import Head from 'next/head';
import { NewTodoForm } from '../components/NewTodoForm';

export default function Home() {
    function handleNewTodo(todo) {
        console.log(todo);
    }

    return (
        <>
            <Head>
                <title>Todo App</title>
            </Head>
            <NewTodoForm onNewTodo={handleNewTodo} />
        </>
    );
}
