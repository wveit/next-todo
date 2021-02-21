export function AuthButtons({ username, onSignOut, onRegister, onSignIn }) {
    if (username) {
        return (
            <div className='AuthButtons'>
                <span>Signed in as {username}</span>
                <button onClick={onSignOut}>Sign Out</button>
            </div>
        );
    } else {
        return (
            <div className='AuthButtons'>
                <button onClick={onSignIn}>Sign In</button>
                <button onClick={onRegister}>Register</button>
            </div>
        );
    }
}
