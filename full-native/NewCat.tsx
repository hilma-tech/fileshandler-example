import React, { useState } from 'react';
import { Platform, Button, StyleSheet, Text, TextInput, View, Image, } from 'react-native';
import { winHeight, winWidth } from './styles';
import * as ImagePicker from 'expo-image-picker';

const NewCat: React.FC = () => {
    const [image, setImage] = useState("");

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const [name, setName] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                New Cat
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    name
                    </Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
                <Button title="upload image" color="green" onPress={pickImage} />
                {
                    image
                        ?
                        <Image source={{ uri: image }} style={styles.image} />
                        :
                        null
                }
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
        borderWidth: 2,
        width: "100%"
    },
    inputContainer: {
        marginBottom: 40,
        alignItems: "center"
    },
    image: {
        // width: 50,
        // width: "auto",
        height: 170,
        width: winWidth / 2
    },
});

export default NewCat;

