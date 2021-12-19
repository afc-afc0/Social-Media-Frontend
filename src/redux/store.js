import { applyMiddleware, createStore, compose} from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk"
import SecureLS  from "secure-ls";
import { setAuthorizationHeader } from "../api/apiCalls";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const secureLs = new SecureLS();


const getStateFromStorage = () => {
    const authData = secureLs.get("auth");
    
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    if (authData)
        return authData;

    return stateInLocalStorage;
}

const updateStateInStorage = (newState) => {
    secureLs.set("auth", newState);
}

export const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState.user);

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );

    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState().user);
    });
    
    return store;
};

export default configureStore;
