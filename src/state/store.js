import { applyMiddleware, createStore, compose} from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {

    const authData = localStorage.getItem("auth");
    
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }

    if (authData) {
        try{
            stateInLocalStorage = JSON.parse(authData);
        } catch (error) {
            console.error("Unexpected state");
        }
    }

    const store = createStore(
        reducers,
        stateInLocalStorage,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );

    store.subscribe(() => {
        localStorage.setItem("auth", JSON.stringify(store.getState()));
    });
    
    return store;
};

export default configureStore;
