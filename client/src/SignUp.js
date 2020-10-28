import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signUp = async () => {
        const res = await fetch("/signUp", {
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
        history.push("/cats");

    };

    return (
        <div>
            <div style={{ fontSize: "40px", margin: "20px" }}>
                SignUp
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
            <button onClick={signUp}>
                SignUp
            </button>
            <div>
                <Link to="/login" >
                    login
                </Link>
            </div>
        </div>
    );
}

export default SignUp;