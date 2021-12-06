import { createStore } from "redux";

const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
});

const initialState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
}

export const store = createStore(
    
)