
const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
}

const reducer = (state = defaultState, action) => {

    console.log("Reducer called");
    console.log(action);
    switch (action.type) {
        case "login":
            return {
                ...action.payload,
                isLoggedIn: true
            };
        case "logout":
            return defaultState;
        default:
            return state;
    }
}

export default reducer;