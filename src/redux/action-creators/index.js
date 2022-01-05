import * as ACTIONS from "../Constants";
import { login, signup, logout } from "../../api/apiCalls"

export const userLogin = (authState) => {
    return {
      type: ACTIONS.LOGIN,
      payload: authState  
    }
}

export const userLogout = () => {
    return async function(dispatch) {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: ACTIONS.LOGOUT
      })
    }
}

export const loginHandler = (credentials) => {
    return async function (dispatch) {
      const response = await login(credentials);

      const authState = {
        ...response.data.user,
        password: credentials.password,
        token: response.data.token
      };  
      dispatch(userLogin(authState));

      return response;
    };
  };

export const signupHandler = (user) => {
  return async function (dispatch) {
    const response = await signup(user);
    await dispatch(loginHandler(user));
    return response;
  };
};

export const updateSuccess = ({displayName, image}) => {
  return  {
    type: ACTIONS.UPDATE_SUCCESS,
    payload : {
      displayName, image
    }
  }
}