
const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
}

const reducer = (state = defaultState, action) => {

    console.log("Reducer called");
    switch (action.type) {
        case "login":
            console.log(action);
            console.log(state);
            return action.user;
        case "logout":
            console.log("returning = ", defaultState);
            return defaultState;
        default:
            return state;
    }
}

export default reducer;