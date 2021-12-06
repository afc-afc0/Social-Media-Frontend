import { bindActionCreators } from "redux";


const reducer = (userState, action) => {
    switch (action.type) {
        case "login":
            return 0;
        case "logout":
            return 0;
        default:
            return userState;
    }
}

export default reducer;