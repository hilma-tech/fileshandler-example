import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();
        console.log(data)
        history.push("/cats");
    };

    return (
        <div>
            <div style={{ fontSize: "40px", margin: "20px" }}>
                Login
            </div>

            <div>
                <div>
                    name
                </div>
                <input value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <div>
                    password
                </div>
                <input value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button onClick={login}>
                Login
            </button>
            <div>
                <Link to="/signup" >
                    sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;