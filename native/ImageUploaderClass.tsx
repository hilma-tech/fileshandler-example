import React, { Component, useState } from 'react';
import { Button, View, StyleSheet, Image, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { FilesUploader, useFiles, withFiles } from '@hilma/fileshandler-native';

export interface ImageUploaderClassProps {
    filesUploader: FilesUploader;
}

export interface ImageUploaderClassState {
    image: string;
    uploadedImage: string;
    id: number | undefined;
}

class ImageUploaderClass extends React.Component<ImageUploaderClassProps, ImageUploaderClassState> {
    constructor(props: ImageUploaderClassProps) {
        super(props);
        this.state = {
            image: "",
            uploadedImage: "",
            id: undefined
        };
        this.pick = this.pick.bind(this);
        this.send = this.send.bind(this);
    }

    async pick() {
        const document: { uri: string } = await DocumentPicker.getDocumentAsync({
            type: "image/jpeg"
        }) as { uri: string };
        console.log(document)
        const newId = this.props.filesUploader.addFile(document.uri);
        if (typeof this.state.id === "number") {
            this.props.filesUploader.delete(this.state.id);
        }
        this.setState({
            id: newId,
            image: document.uri
        });
    }

    async send() {
        const url = "http://10.11.54.217:8080/multiple";
        const res = await this.props.filesUploader.fetch(url, {
            method: "POST",
            body: JSON.stringify({
                imageId: this.state.id
            })
        });

        const resJ: { success: boolean; image: string } = await res.json();

        this.setState({
            uploadedImage: `http://10.11.54.217:8080${resJ.image}`
        });
    };



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonsContainer}>
                    <Button title="upload" onPress={this.pick} />
                    <Button title="send" onPress={this.send} />
                </View>

                {
                    this.state.image ? <Image source={{ uri: this.state.image }} style={styles.image} /> : null
                }

                {
                    this.state.uploadedImage ? <Image source={{ uri: this.state.uploadedImage }} style={styles.image} /> : null
                }
            </View>
        );
    }
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

export default withFiles(ImageUploaderClass);