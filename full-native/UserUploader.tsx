import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { winHeight, winWidth } from './styles';

interface UserUploaderProps {
    title: string;
    username: string;
    onUsernameChange: (img: string) => void;
    password: string;
    onPasswordChange: (name: string) => void;
    onSend: () => void;
    redirectName: string;
    onRedirect: () => void;
}

const UserUploader: React.FC<UserUploaderProps> = ({ title, username, onUsernameChange, password, onPasswordChange, onSend, redirectName, onRedirect }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    username
                </Text>
                <TextInput style={styles.input} value={username} onChangeText={onUsernameChange} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    password
                </Text>
                <TextInput style={styles.input} value={password} onChangeText={onPasswordChange} />
            </View>
            <Button title="send" onPress={onSend} />

            <TouchableOpacity onPress={onRedirect}>
                <Text>
                    {redirectName}
                </Text>
            </TouchableOpacity>
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

export default UserUploader;