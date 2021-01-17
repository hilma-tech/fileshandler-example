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

type Headers = {
    Cookie: string
};

const useAuthHeaders = (): Headers => {
    const cookies = useAuthCookies();
    return {
        Cookie: cookies
    };
}

const variables = require("./variables.js");
const apiUrl: string = variables.default.apiUrl;

const getFullPath = (path: string): string => {
    return apiUrl + path;
}
const UploadedImage: React.FC<ImageProps> = props => {

    const { source: originalSource, ...otherProps } = props;

    if (typeof originalSource === "number") {
        return <Image {...props} />
    }


    let source = { ...originalSource };

    const headers = useAuthHeaders();

    if (Array.isArray(source)) {
        source = source.map(sourceItem => {
            if (!sourceItem.uri) {
                return sourceItem;
            }

            const { uri: originalUri, headers: originalHeaders, ...otherSourceItems } = sourceItem;

            const uri = getFullPath(originalUri);
            const itemHeaders = originalHeaders ? { ...originalHeaders, ...headers } : headers;

            return {
                uri,
                headers: itemHeaders,
                ...otherSourceItems
            }
        });
    } else if (source.uri) {
        source.uri = getFullPath(source.uri);
        source.headers = source.headers ? { ...source.headers, ...headers } : headers;
    }

    return (
        <Image
            source={source}
            {...otherProps}
        />
    );
}


export default UploadedImage;