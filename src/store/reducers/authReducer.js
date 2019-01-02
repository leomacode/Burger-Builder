import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_REDIRECT_PATH
} from "./../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  isAuth: false,
  redirectPath: "/"
};

const authReducer = (
  state = initialState,
  { type, token, id, error, path }
) => {
  switch (type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token,
        userId: id,
        loading: false,
        isAuth: true
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        token: null,
        userId: null,
        isAuth: false
      };
    case SET_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: path
      };

    default:
      return state;
  }
};

export default authReducer;
