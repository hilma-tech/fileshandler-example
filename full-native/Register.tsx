import React, { useState } from 'react';
import UserUploader from './UserUploader';

import { StackNavigationProp } from '@react-navigation/stack';


const Register: React.FC<{ navigation: StackNavigationProp<any> }> = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSend = () => {

    }

    const handleRedirect = () => {
        navigation.navigate("Login");
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