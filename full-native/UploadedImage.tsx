import React, { useEffect, useState } from 'react';
import { Image, ImageProps, ImageURISource } from 'react-native';

import { useGetAuthItem, useGetAccessToken, createCookieString } from '@hilma/auth-native';

const UploadedImage: React.FC<ImageProps> = props => {
    const { source, ...otherProps } = props;

    const imagePath = (source as ImageURISource).uri as string;
    const [uri, setUri] = useState("");

    // const getAuthItem = useGetAuthItem();
    // const item = getAuthItem("actlt");

    const getAccessToken = useGetAccessToken();
    const accessToken = getAccessToken();
    const cookie = createCookieString({ actlt: accessToken });
    console.log("act", cookie)

    useEffect(() => {
        const apiUrl = require("./variables.js").default.apiUrl;
        // console.log(imagePath + apiUrl)
        setUri(apiUrl + imagePath);
    }, [imagePath]);
    console.log(accessToken)
    return (
        uri
            ?
            <Image
                // source={{ uri }}
                source={{
                    uri: uri,// + "?" + new Date(),
                    headers: {
                        Cookie: cookie,
                        Authorization: accessToken ?? "",
                        name: "michael"
                    },
                    method: "GET"

                    // cache: "reload"
                }}
                {...otherProps}

            />
            :
            null
    );
}


export default UploadedImage;