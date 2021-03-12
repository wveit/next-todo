import { configureStore } from '@reduxjs/toolkit';
import user from './redux-slices/user';
import authForm from './redux-slices/auth-form';

export default configureStore({
    reducer: { user, authForm },
});
