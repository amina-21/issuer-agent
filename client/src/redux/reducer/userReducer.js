import { SIGN_OUT_USER_SUCCESS } from "./../const";

const INITIAL_STATE = {
  username: null,
  password: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SIGN_OUT_USER_SUCCESS:
        return {
          ...state,
          ...INITIAL_STATE,
        };
      default:
        return state;
    }
}

export default userReducer;