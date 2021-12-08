
export const userLogin = (auth) => {
    return (dispatch) => {
        dispatch({
            type: "login",
            payload: auth
        })
    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch({
            type: "logout"
        })
    }
}
