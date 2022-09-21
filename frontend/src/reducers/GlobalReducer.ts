import { IGlobalState } from "./@types";

export const GlobalState: IGlobalState = {
  userName: "",
};

export type ActonType = {
  type: "DASHBOARD.SET_USERNAME";
  payload: any;
};

export const GlobalReducer = (state: any, action: ActonType) => {
  switch (action.type) {
    case "DASHBOARD.SET_USERNAME":
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};
