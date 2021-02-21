import { useState } from 'react';

const defaultFields = {
    email: '',
    password: '',
};

export function SignInForm({ onCancel, onSuccessfulSignIn }) {
    const [fields, setFields] = useState(defaultFields);

    function handleChange(event) {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    function handleSubmit() {
        /* TODO: actually make api call to register */
        const fakeUser = {
            ...fields,
            username: fields.email.split('@')[0],
            token: 'lksdjflsdk',
        };
        onSuccessfulSignIn(fakeUser);
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
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
