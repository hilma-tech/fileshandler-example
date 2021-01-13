import React, { useState } from 'react';
import UserUploader from './UserUploader';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSend = () => {

    }

    const handleRedirect = () => {

    }

    return (
        <UserUploader
            title="login"
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSend={handleSend}
            redirectName="Register"
            onRedirect={handleRedirect}
        />
    );
}

export default Login;