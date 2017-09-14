import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILED,
    UPLOAD_IMAGE
} from '../Actions/types';

const INITIAL_STATE = {
    images: [],
    image: {},
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

        default:
            return state;
    }
};