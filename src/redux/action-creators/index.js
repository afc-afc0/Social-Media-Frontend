import * as ACTIONS from "../Constants";
import { login } from "../../api/apiCalls"

export const userLogin = (authState) => {
    return (dispatch) => {
        dispatch({
            type: ACTIONS.LOGIN,
            payload: authState
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

export const loginHandler = (credentials) => {
    return async function (dispatch) {
      const response = await login(credentials);

      const authState = {
        ...response.data,
        password: credentials.password,
      };
  
      dispatch(userLogin(authState));
  
      return response;
    };
  };