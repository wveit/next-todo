import { configureStore } from '@reduxjs/toolkit';
import user from './redux-slices/user';
import authForm from './redux-slices/auth-form';
import todos from './redux-slices/todos';

export default configureStore({
    reducer: { user, authForm, todos },
});
