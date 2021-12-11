import * as ACTIONS from "../Constants";

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...action.payload,
                isLoggedIn: true
            };
        case ACTIONS.LOGOUT:
            return defaultState;
        default:
            return state;
    }
}

export default reducer;