import React, { useState } from 'react';

//login for user - taking username and password
export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

    const handleRegister = (e) => {
        e.preventDefault()
        props.onRegister(true)
    }


    return (
        <form>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
            <button
                type="submit"
                onClick={handleRegister}
            >
                Register Here
            </button>
        </form>
    );
}

