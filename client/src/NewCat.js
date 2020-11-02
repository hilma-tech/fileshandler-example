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
        // const res = await filesUploader.fetch("/cat/new-cat", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name,
        //         imageId
        //     })
        // });

        // const data = await res.json();
        const res = await filesUploader.post("/cat/new-cat", JSON.stringify({name, imageId}))
        history.push("/cats")
    };

    const handleImageChange = value => {
        setImageId(value.id);
        setImageLink(value.link);
    };

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
                <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} id="image-input" />
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