import React, { useState } from 'react';
import UserUploader from './UserUploader';

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSend = () => {

    }

    const handleRedirect = () => {

    }

    return (
        <UserUploader
            title="Register"
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSend={handleSend}
            redirectName="Login"
            onRedirect={handleRedirect}
        />
    );
}

export default Register;