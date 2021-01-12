import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, } from 'react-native';
import { winHeight, winWidth } from './styles';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                login
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    username
                </Text>
                <TextInput style={styles.input} value={username} onChangeText={setUsername} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    password
                </Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} />
            </View>
            <Button title="send" onPress={() => null} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: winWidth,
        height: winHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20
        // justifyContent: "space-around"
    },
    title: {
        fontSize: 30,
    },
    label: {
        fontSize: 15
    },
    input: {
        borderColor: "black",
        borderWidth: 2
    },
    inputContainer: {
        marginBottom: 5
    }
});

export default Login;