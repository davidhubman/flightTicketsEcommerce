import {
  GET_FLIGHT,
  GET_SEATS,
  SET_LOADING,
  GET_FLIGHT_URL,
  RESET,
  GET_FAVS,
  IS_AVAILABLE,
  RESET_FAVS_Y_AVAILABLES,
  GET_TICKETS,
  RESET_SEATS_STATE
} from "../actionTypes";

const initialState: any = {
  allFlight: undefined,
  allSeats: {},
  loading: false,
  favs: [],
  availableFlight: {}
};

type Action = {
  type: string;
  payload: object | null;
};

export default function rootReducer(state = initialState, action: Action) {
  switch (action.type) {
    case GET_FLIGHT:
      return {
        ...state,
        allFlight: action.payload,
      };
    case GET_SEATS:
      return {
        ...state,
        allSeats: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
      case GET_FLIGHT_URL:
      return {
        ...state,
        allFlight: action.payload,
      };
      case RESET:
      return {
        ...state,
        allFlight: initialState.allFlight,
      };
      case GET_FAVS:
      return {
        ...state,
        favs: action.payload
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload
      };
      case IS_AVAILABLE:
      return {
        ...state,
        availableFlight: action.payload
      };
      case RESET_FAVS_Y_AVAILABLES:
      return {
        ...state,
        favs: initialState.favs,
        availableFlight: initialState.availableFlight
      };
      case RESET_SEATS_STATE:
      return {
        ...state,
        allSeats: initialState.allSeats
      };
    default:
      return state;
  }
}
