import React, { useState } from 'react';
import { Button, View, StyleSheet, Image, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { useFiles } from '@hilma/fileshandler-native';

const ImageUploader: React.FC = () => {
    const [image, setImage] = useState("");
    const [id, setId] = useState<number | undefined>();

    const [uploadedImage, setUploadedImage] = useState("");

    const filesUploader = useFiles();

    const pick = async () => {
        const document: { uri: string } = await DocumentPicker.getDocumentAsync({
            type: "image/jpeg"
        }) as { uri: string };

        setImage(document.uri);
        const newId = filesUploader.addFile(document.uri);
        if (typeof id === "number") {
            filesUploader.delete(id);
        }
        setId(newId);
    };

    const send = async () => {
        // const res = await filesUploader.fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         imageId: id
        //     })
        // });

        // const resJ: { success: boolean; image: string } = await res.json();
        // console.log(resJ)

        // const res = await filesUploader.post(url, JSON.stringify({ imageId: id }));

        const url = "http://10.11.54.217:8080/multiple";

        const res = await filesUploader.request({
            data: JSON.stringify({ imageId: id }),
            method: "POST",
            url
        });

        setUploadedImage(`http://10.11.54.217:8080${res.data.image}`);

    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button title="upload" onPress={pick} />
                <Button title="send" onPress={send} />
            </View>

            {
                image ? <Image source={{ uri: image }} style={styles.image} /> : null
            }

            {
                uploadedImage ? <Image source={{ uri: uploadedImage }} style={styles.image} /> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "50%"
    },
    image: {
        width: 100,
        height: 100
    }
});

export default ImageUploader;