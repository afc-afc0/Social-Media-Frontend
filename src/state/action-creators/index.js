import * as ACTIONS from "../Constants";

export const userLogin = (auth) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.LOGIN,
            payload: auth
        })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.LOGOUT
        })
    }
}
