import { useState } from 'react';
import { signInAndGetUser } from '../util/users-client';

const defaultFields = {
    email: '',
    password: '',
};

export function SignInForm({ onCancel, onSuccessfulSignIn }) {
    const [fields, setFields] = useState(defaultFields);
    const [errors, setErrors] = useState(null);

    function handleChange(event) {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    async function handleSubmit() {
        const { errors, user } = await signInAndGetUser(fields);
        if (errors) {
            setErrors(errors);
            return;
        } else {
            onSuccessfulSignIn(user);
            onCancel();
        }
    }

    return (
        <div className='RegisterForm'>
            <h3>Sign In</h3>
            <input
                type='text'
                name='email'
                placeholder='Enter email'
                value={fields.email}
                onChange={handleChange}
            />
            <br />
            <input
                type='password'
                name='password'
                placeholder='Enter Password'
                value={fields.password}
                onChange={handleChange}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onCancel}>Cancel</button>{' '}
            {errors ? (
                <div>
                    <p>Errors:</p>
                    <p>{JSON.stringify(errors)}</p>
                </div>
            ) : null}
        </div>
    );
}
