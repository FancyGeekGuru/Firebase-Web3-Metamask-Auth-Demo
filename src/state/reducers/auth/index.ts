import { AnyAction } from 'redux';
import {
    IS_LOADING,
    METAMASK_CONNECTED,
    METAMASK_DISCONNECTED,
    USER_ALREADY_REGISTERD,
} from '../../actions/auth';

const initalUserInfo = {
    name: '',
    description: ''
};

const initialState = {
    walletConnected: false,
    publicAddress: '',
    userLogined: false,
    userInfo: initalUserInfo,

    loading: false,
    error: null,
};

const authReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error
            };

        case METAMASK_CONNECTED:
            return {
                ...state,
                walletConnected: true,
                publicAddress: action.payload.publicAddress
            };

        case METAMASK_DISCONNECTED:
            return {
                ...state,
                walletConnected: false,
                publicAddress: '',
                userLogined: false,
                loading: false,
                error: null
            };

        case USER_ALREADY_REGISTERD:
            return {
                ...state,
                userLogined: true,
                userInfo: action.payload,
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export default authReducer;