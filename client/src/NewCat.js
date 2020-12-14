import React, { useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useFiles, FileInput } from '@hilma/fileshandler-client';

import "./_NewCat.scss";
const NewCat = () => {
    const filesUploader = useFiles();

    const history = useHistory();

    const [name, setName] = useState("");
    const [imageId, setImageId] = useState(null);
    const [imageLink, setImageLink] = useState("");

    const send = async () => {
        try {
            const res = await filesUploader.post("/cat/new-cat", JSON.stringify({ name, imageId }))
            history.push("/cats")
        } catch (err) { }
    };

    const handleImageChange = value => {
        console.log(value)
        setImageId(value.id);
        setImageLink(value.link);
    };

    const handleUploadError = err => {
        alert(`היית אמור להעלות תמונה אבל במקום זה העלאת קובץ מסוג ${err.mimeType}, לא יפה`);
    }

    return (
        <div className="new-cat">
            <div style={{ fontSize: "40px", margin: "20px" }}>
                New Cat
            </div>

            <div>
                <div>
                    name
                </div>
                <input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="image-input" >
                    choose image
                </label>
                <br />
                <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} onError={handleUploadError} id="image-input" />
            </div>
            {
                imageLink &&
                <img src={imageLink} className="selected-image" />
            }
            <button onClick={send} className="send">
                send
            </button>
            <div>
                <Link to="/cats" >
                    cats
                </Link>
            </div>
        </div>
    );
};

export default NewCat;