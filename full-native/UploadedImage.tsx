import React, { useEffect, useState } from 'react';
import { Image, ImageProps, ImageURISource } from 'react-native';

import { createCookieString, useAccessTokenCookie, useGetAccessToken } from '@hilma/auth-native';

const useAuthCookies = (): string => {
    const cookieName = useAccessTokenCookie();

    const getAccessToken = useGetAccessToken();
    const accessToken = getAccessToken();

    if (!accessToken) {
        return "";
    }

    return createCookieString({ [cookieName]: accessToken });
}

// interface Headers {
//     Cookie: string;
// }
type Headers = {
    Cookie: string
};

const useAuthHeaders = (): Headers => {
    const cookies = useAuthCookies();
    return {
        Cookie: cookies
    };
}

const UploadedImage: React.FC<ImageProps> = props => {
    const headers = useAuthHeaders();

    console.log(headers)
    const { source, ...otherProps } = props;

    const imagePath = (source as ImageURISource).uri as string;
    const [uri, setUri] = useState("");

    // const getAuthItem = useGetAuthItem();
    // const item = getAuthItem("actlt");

    const getAccessToken = useGetAccessToken();
    const accessToken = getAccessToken();
    const cookie = createCookieString({ actlt: accessToken });

    const cookieName = useAccessTokenCookie();
    console.log(cookieName)

    useEffect(() => {
        const apiUrl = require("./variables.js").default.apiUrl;
        // console.log(imagePath + apiUrl)
        setUri(apiUrl + imagePath);
    }, [imagePath]);

    return (
        uri
            ?
            <Image
                // source={{ uri }}
                source={{
                    uri: uri,// + "?" + new Date(),
                    // headers: {
                    //     Cookie: cookie,
                    //     Authorization: accessToken ?? "",
                    //     name: "michael"
                    // },
                    headers: headers,
                    // method: "GET"

                    // cache: "reload"
                }}
                {...otherProps}

            />
            :
            null
    );
}


export default UploadedImage;