export async function signInAndGetUser(credentials) {
    let response = await signIn(credentials);
    if (response.errors) return { errors: response.errors };
    let token = response.token;

    response = await getUserInfo(token);
    if (response.errors) return { errors: response.errors };

    return { user: { ...response.user, token } };
}

export async function registerAndGetUser(credentials) {
    let response = await register(credentials);
    if (response.errors) return { errors: response.errors };
    let token = response.token;

    response = await getUserInfo(token);
    if (response.errors) return { errors: response.errors };

    return { user: { ...response.user, token } };
}

export async function getUserInfo(token) {
    const response = await fetch('/api/users/me', {
        headers: {
            'x-auth-token': token,
        },
    });
    let responseObj = await response.json();
    return responseObj;
}

export async function signIn(credentials) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    let responseObj = await response.json();
    const { token, errors } = responseObj;
    if (errors) return { errors };
    else return { token };
}

export async function register(credentials) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    let responseObj = await response.json();
    const { token, errors } = responseObj;
    if (errors) return { errors };
    else return { token };
}
