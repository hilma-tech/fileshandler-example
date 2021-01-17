import React from 'react';
import { Platform, Button, StyleSheet, Text, TextInput, View, Image, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import UploadedImage from './UploadedImage';
import { UploadedImage } from '@hilma/fileshandler-native';

import { winHeight, winWidth } from './styles';

interface CatUploaderProps {
    title: string;
    img: string;
    onImageChange: (img: string) => void;
    name: string;
    onNameChange: (name: string) => void;
    onSend: () => void;
    useUploadedImage: boolean;
}

const CatUploader: React.FC<CatUploaderProps> = ({ title, name, onNameChange, img, onImageChange, onSend, useUploadedImage }) => {

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


        if (!result.cancelled) {
            onImageChange(result.uri);
        }
    };

    console.log(useUploadedImage)
    console.log(img)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    name
                </Text>
                <TextInput style={styles.input} value={name} onChangeText={onNameChange} />
                <Button title="upload image" color="green" onPress={pickImage} />
                {
                    img
                        ?
                        (
                            useUploadedImage
                                ?
                                <UploadedImage source={{ uri: img }} style={styles.image} />
                                :
                                <Image source={{ uri: img }} style={styles.image} />
                        )
                        :
                        null
                }
            </View>
            <Button title="send" onPress={onSend} />
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

export default CatUploader;

