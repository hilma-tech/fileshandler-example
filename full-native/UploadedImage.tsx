import React, { useEffect, useState } from 'react';
import { Image, ImageProps, ImageURISource } from 'react-native';

const UploadedImage: React.FC<ImageProps> = props => {
    const { source, ...otherProps } = props;
    
    const imagePath = (source as ImageURISource).uri as string;
    const [uri, setUri] = useState("");

    useEffect(() => {
        const apiUrl = require("./variables.js").default.apiUrl;
        console.log(imagePath + apiUrl)
        setUri(apiUrl + imagePath);
    }, []);

    console.log(imagePath)
    return (

        <Image source={{ uri }} {...otherProps} />

    );
}


export default UploadedImage;