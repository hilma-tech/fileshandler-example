import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import CatUploader from './CatUploader';
import Axios from 'axios';
import { useFiles } from "@hilma/fileshandler-native";

const EditCat: React.FC = () => {

    const filesUploader = useFiles();

    const navigation = useNavigation();
    const route = useRoute();

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [useUploadedImage, setUseUploadedImage] = useState(true);

    useEffect(() => {
        (async () => {
            if (!(route.params as { catId: number })?.catId) {
                navigation.navigate("cats");
                return;
            }
            const res = await Axios.get(`/cat/single-cat/${(route.params as { catId: number }).catId}`)
            // console.log(res.data.imagePath)
            setName(res.data.name);
            setImage(res.data.imagePath);
            console.log(res.data.imagePath)
        })();

    }, []);

    const handleSend = async () => {
        try {
            filesUploader.deleteAll();
            const imageId = useUploadedImage ? null : filesUploader.addFile(image);

            const res = await filesUploader.post(`/cat/update-cat/${(route.params as { catId: number })?.catId}`, JSON.stringify({
                name,
                imageId
            }))
            navigation.navigate("cats");
        } catch (err) { }
    }

    const handleImageChange = (img: string) => {
        setImage(img);
        setUseUploadedImage(false);
    }

    return (
        <CatUploader
            title="Edit Cat"
            img={image}
            name={name}
            onImageChange={handleImageChange}
            onNameChange={setName}
            onSend={handleSend}
            useUploadedImage={useUploadedImage}
        />
    );
}

export default EditCat;

