import { IGlobalState } from "./@types";

export const GlobalState: IGlobalState = {
  userName: "",
  activeUsers: [],
  localStream: null,
};

export type ActonType = {
  type:
    | "DASHBOARD.SET_USERNAME"
    | "DASHBOARD.SET_ACTIVE_USERS"
    | "DASHBOARD.SET_LOCAL_STREAM";
  payload: any;
};

export const GlobalReducer = (state: IGlobalState, action: ActonType) => {
  switch (action.type) {
    case "DASHBOARD.SET_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "DASHBOARD.SET_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: action.payload,
      };
    case "DASHBOARD.SET_LOCAL_STREAM":
      return {
        ...state,
        localStream: action.payload,
      };

    default:
      return state;
  }
};
