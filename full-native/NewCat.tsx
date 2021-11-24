import React, { useState } from 'react';
import CatUploader from './CatUploader';
import { useFiles } from '@hilma/fileshandler-native';
import { useNavigation } from '@react-navigation/native';

const NewCat: React.FC = () => {
    const navigation = useNavigation();

    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const filesUploader = useFiles();

    const handleSend = async () => {
        try {
            filesUploader.deleteAll();
            const imageId = filesUploader.addFile(image);
            const res = await filesUploader.post("/cat/new-cat", JSON.stringify({ name, imageId }));
            navigation.navigate("cats");
        } catch (err) {console.log(err) }
    }

    return (
        <CatUploader
            title="New Cat"
            img={image}
            name={name}
            onImageChange={setImage}
            onNameChange={setName}
            onSend={handleSend}
            useUploadedImage={false}
        />
    );
}

export default NewCat;

