import React, { useState } from 'react';
import UserUploader from './UserUploader';

import { StackNavigationProp } from '@react-navigation/stack';
import { useLogin } from '@hilma/auth-native';

const Login: React.FC<{ navigation: StackNavigationProp<any> }> = ({ navigation }) => {

    const login = useLogin();

    const [username, setUsername] = useState("michael");
    const [password, setPassword] = useState("michael");

    const handleSend = async () => {
        try {

            const user = await login("/login", {
                username,
                password
            });
            navigation.navigate("cats");
        } catch (err) {

        }
    }

    const handleRedirect = () => {
        navigation.navigate("sign-up");
    }

    return (
        <UserUploader
            title="Login"
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