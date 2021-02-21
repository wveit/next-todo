import { useState } from 'react';

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
        let response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        });
        let responseObj = await response.json();
        if (responseObj.errors) {
            setErrors(responseObj.errors);
            return;
        }
        const { token } = responseObj;

        response = await fetch('/api/users/me', {
            headers: {
                'x-auth-token': token,
            },
        });
        responseObj = await response.json();
        if (responseObj.errors) {
            setErrors({ meEndpoint: '/api/users/me failed' });
            return;
        }

        const { username, email } = responseObj;

        const user = { username, email, token };

        onSuccessfulSignIn(user);
        onCancel();
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
