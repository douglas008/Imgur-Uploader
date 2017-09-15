import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILED,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_API,
    REQUEST_IMAGES,
    REQUEST_IMAGES_FAILED,
    REQUEST_IMAGES_SUCCESS,
    REQUEST_IMAGES_API,
    AUTH
} from './types';

// Actions
const uploadSuccess = (dispatch) => {
    dispatch({
        type: UPLOAD_IMAGE_SUCCESS
    });
};

const uploadFailed = (dispatch) => {
    dispatch({
        type: UPLOAD_IMAGE_FAILED
    });
};

const requestImagesSuccess = (dispatch, images) => {
    dispatch({
        type: REQUEST_IMAGES_SUCCESS,
        payload: images
    });
};

const requestImagesFailed = (dispatch) => {
    dispatch({
        type: REQUEST_IMAGES_FAILED
    });
};

export const requestImages = () => (dispatch) => {
    dispatch({ type: REQUEST_IMAGES });
    axios.get(REQUEST_IMAGES_API, { 'headers': { 'Authorization': AUTH } })
        .then(response => {
            console.log(response);
            requestImagesSuccess(dispatch, response.data);
        }).catch(() => requestImagesFailed(dispatch));
};


export const uploadImage = (image) => (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE });
    RNFetchBlob.fetch('POST', UPLOAD_IMAGE_API, {
        // Imgur upload headers
        Authorization: AUTH
        // Body
    }, RNFetchBlob.wrap(image.uri))
        .then((res) => {
            // dispatch success
            uploadSuccess(dispatch);
        })
        .catch((err) => {
            // dispatch failure
            uploadFailed(dispatch);
        });
};

