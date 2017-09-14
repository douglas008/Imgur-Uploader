import { combineReducers } from 'redux';
import ImagesReducer from './ImagesReducer';

export default combineReducers({
    // pieceOfState: producedByReducer,
    imagesReducer: ImagesReducer
});