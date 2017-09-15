import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILED,
    UPLOAD_IMAGE,
    REQUEST_IMAGES,
    REQUEST_IMAGES_FAILED,
    REQUEST_IMAGES_SUCCESS,
} from '../Actions/types';

const INITIAL_STATE = {
    images: [],
    error: null,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case UPLOAD_IMAGE:
            return { ...state, loading: true };

        case UPLOAD_IMAGE_SUCCESS:
            return { ...state, loading: false, error: null };

        case UPLOAD_IMAGE_FAILED:
            return { ...state, loading: false, error: 'Uploading image failed' };

        case REQUEST_IMAGES:
            return { ...state, loading: true };

        case REQUEST_IMAGES_SUCCESS:
            return { ...state, loading: false, images: action.payload, error: null };

        case REQUEST_IMAGES_FAILED:
            return { ...state, loading: false, error: 'Request images failed' };

        default:
            return state;
    }
};