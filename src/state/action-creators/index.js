
export const userLogin = (auth) => {
    return (dispatch) => {
        dispatch({
            type: "login",
            user: auth
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
