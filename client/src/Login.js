import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLogin } from '@hilma/auth';

const Login = () => {
    const history = useHistory();
    const authLogin = useLogin();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        await authLogin("/login", { username, password });
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
                <Link to="/sign-up" >
                    sign up
                </Link>
            </div>
        </div>
    );
}

export default Login;