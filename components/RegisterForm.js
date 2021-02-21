import { useState } from 'react';

const defaultFields = {
    username: '',
    email: '',
    password: '',
};

export function RegisterForm({ onCancel, onSuccessfulRegister }) {
    const [fields, setFields] = useState(defaultFields);

    function handleChange(event) {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value });
    }

    function handleSubmit() {
        /* TODO: actually make api call to register */
        const fakeUser = { ...fields, token: 'lksdjflsdk' };
        onSuccessfulRegister(fakeUser);
        onCancel();
    }

    return (
        <div className='RegisterForm'>
            <h3>Register</h3>
            <input
                type='text'
                name='username'
                placeholder='Enter username'
                value={fields.username}
                onChange={handleChange}
            />
            <br />
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
