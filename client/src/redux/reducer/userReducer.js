// import { SIGN_OUT_USER_SUCCESS } from "../const";

// const INITIAL_STATE = {
//   username: null,
//   password: null,
// };

// const userReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//       case SIGN_OUT_USER_SUCCESS:
//         return {
//           ...state,
//           ...INITIAL_STATE,
//         };
//       default:
//         return state;
//     }
// }

// export default userReducer;

// userReducer.js

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
