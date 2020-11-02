import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, Link, useParams } from 'react-router-dom';
import { useFiles, FileInput } from '@hilma/fileshandler-client';

import "./_NewCat.scss";

const UpdateCat = () => {
    const filesUploader = useFiles();

    const history = useHistory();
    const params = useParams();
    const [name, setName] = useState("");
    const [imageId, setImageId] = useState(null);
    const [imageLink, setImageLink] = useState("");

    const send = async () => {
        // const res = await filesUploader.fetch(`/cat/update-cat/${params.id}`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         name,
        //         imageId
        //     })
        // });
        const res = await filesUploader.post(`/cat/update-cat/${params.id}`, JSON.stringify({
            name,
            imageId
        }))
        history.push("/cats")
    };

    useEffect(() => {
        (async () => {
            const res = await fetch(`/cat/single-cat/${params.id}`);
            const data = await res.json();
            setName(data.name);
            setImageLink(data.imagePath);
        })();
    }, []);

    const handleImageChange = value => {
        setImageId(value.id);
        setImageLink(value.link);
    };

    return (
        <div className="new-cat">
            <div style={{ fontSize: "40px", margin: "20px" }}>
                Update Cat
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

export default UpdateCat;