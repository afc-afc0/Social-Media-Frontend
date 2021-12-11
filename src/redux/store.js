import { applyMiddleware, createStore, compose} from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk"
import SecureLS  from "secure-ls";

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
    const store = createStore(
        reducers,
        getStateFromStorage(),
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );

    store.subscribe(() => {
        updateStateInStorage(store.getState());
    });
    
    return store;
};

export default configureStore;
