export const METAMASK_CONNECTED = 'METAMASK_CONNECTED';
export const METAMASK_DISCONNECTED = 'METAMASK_DISCONNECTED';
export const USER_ALREADY_REGISTERD = 'USER_ALREADY_REGISTERD';
export const IS_LOADING = 'IS_LOADING';

export const metamask_connected = (payload) => {
    return (dispatch) => {
        dispatch({ type: METAMASK_CONNECTED, payload: payload });
    };
};

export const metamask_disconnected = () => {
    return (dispatch) => {
        dispatch({ type: METAMASK_DISCONNECTED });
    };
};

export const is_loading = (payload) => {
    return (dispatch) => {
        dispatch({ type: IS_LOADING, payload: payload });
    };
};

export const user_already_registered = (payload) => {
    return (dispatch) => {
        dispatch({ type: USER_ALREADY_REGISTERD, payload: payload });
    };
};