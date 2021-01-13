import React, { useState } from 'react';
import CatUploader from './CatUploader';


const NewCat: React.FC = () => {
    const [image, setImage] = useState("");

    const [name, setName] = useState("");

    const handleSend = () => {

    }

    return (
        <CatUploader
            title="New Cat"
            img={image}
            name={name}
            onImageChange={setImage}
            onNameChange={setName}
            onSend={handleSend}
        />
    );
}

export default NewCat;

