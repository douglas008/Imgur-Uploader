import RNFetchBlob from 'react-native-fetch-blob';
import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILED,
    UPLOAD_IMAGE
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

export const uploadImage = (image) => (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE });
    RNFetchBlob.fetch('POST', 'https://api.imgur.com/3/image', {
        // Imgur upload headers
        Authorization: "Bearer ba6219899e5156d57e1a72ae3e2ae907258ad685"
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

