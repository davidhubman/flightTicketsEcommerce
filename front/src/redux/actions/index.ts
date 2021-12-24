import axios from "axios";
import {
  GET_FLIGHT,
  GET_SEATS,
  SET_LOADING,
  GET_FLIGHT_URL,
  RESET,
  SEND_FAVS,
  GET_FAVS,
  GET_TICKETS,
  IS_AVAILABLE,
  RESET_FAVS_Y_AVAILABLES,
  GET_PAY,
  RESET_SEATS_STATE
} from "../actionTypes";


export function getFlight(payload: any) {
  return async function(dispatch: any) {
    try {
      if (payload.journeyType === true) {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&rDate=${payload.returnDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=${payload.class}`
        );

        return dispatch({
          type: GET_FLIGHT,
          payload: json.data,
        });
      } else {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=${payload.class}`
        );
        return dispatch({
          type: GET_FLIGHT,
          payload: json.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function getFlightUrl(payload: any) {
  return async function(dispatch: any) {
    try {
      const json = await axios.get(`http://localhost:3001/search${payload}`);
      return dispatch({
        type: GET_FLIGHT_URL,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: GET_FLIGHT_URL,
        payload: { mensaje: err },
      });
    }
  };
}

export function setLoading(payload: boolean) {
  return async function(dispatch: any) {
    return dispatch({
      type: SET_LOADING,
      payload: payload,
    });
  };
}

export function getSeats(payload: any) {
  return async function(dispatch: any) {
    try {
      const info = await axios.get(`http://localhost:3001/seats/${payload}`);
      return dispatch({
        type: GET_SEATS,
        payload: info.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: GET_SEATS,
        payload: "error",
      });
    }
  };
}

export function resetSeatsState(payload: any) {
  return async function(dispatch: any) {
    return dispatch({
      type: RESET_SEATS_STATE,
    });
  }
}

export function resetState() {
  return async function(dispatch: any) {
    return dispatch({
      type: RESET,
    });
  };
}
export function getPay(payload: any) {
  return async function(dispatch: any) {
    return dispatch({
      type: GET_PAY,
      payload: payload,
    });
  };
}

export function resetUserProfile() {
  return async function(dispatch: any) {
    return dispatch({
      type: RESET_FAVS_Y_AVAILABLES,
    });
  };
}

export function sendFavs(payload: any) {
  return async function(dispatch: any) {
    /* eslint-disable */
    const favs = await axios.post("http://localhost:3001/saveflight", payload);
    /* eslint-enable */
    dispatch({
      type: SEND_FAVS,
    });
  };
}

export function getFavs(payload: any) {
  return async function(dispatch: any) {
    const favs = await axios.get(`http://localhost:3001/getsaves/${payload}`);
    dispatch({
      type: GET_FAVS,
      payload: favs.data,
    });
  };
}

export function isAvailable(payload: any) {
  return async function(dispatch: any) {
    if (payload[0].rDate) {
      try {
        const info = await axios.get(
          `http://localhost:3001/isavailable?origin=${payload[0].origin}&destination=${payload[0].destination}&originAirport=${payload[0].originAirport}&destinationAirport=${payload[0].destinationAirport}&dDate=${payload[0].dDate}&rDate=${payload[0].rDate}&adults=${payload[0].adults}&childs=${payload[0].childs}&baby=${payload[0].baby}&cabin=${payload[0].cabin}&flightId=${payload[0].offers}&price=${payload[0].price}&transfersD=${payload[0].transfersD.length}&transfersR=${payload[0].transfersR.length}`
        );
        if(info.data.message){
          return dispatch({
            type: IS_AVAILABLE,
            payload: info.data.message,
          });
        }
        return dispatch({
          type: IS_AVAILABLE,
          payload: info.data,
        });
      } catch (err) {
        return dispatch({
          type: IS_AVAILABLE,
          payload: "error",
        });
      }
    } else {
      try {
        const info = await axios.get(
          `http://localhost:3001/isavailable?origin=${payload[0].origin}&destination=${payload[0].destination}&originAirport=${payload[0].originAirport}&destinationAirport=${payload[0].destinationAirport}&dDate=${payload[0].dDate}&adults=${payload[0].adults}&childs=${payload[0].childs}&baby=${payload[0].baby}&cabin=${payload[0].cabin}&flightId=${payload[0].offers}&price=${payload[0].price}&transfers=${payload[0].transfers.length}`
        );
        if(info.data.message){
          return dispatch({
            type: IS_AVAILABLE,
            payload: info.data.message,
          });
        }
        return dispatch({
          type: IS_AVAILABLE,
          payload: info.data,
        });
      } catch (err) {
        return dispatch({
          type: IS_AVAILABLE,
          payload: "error",
        });
      }
    }
  };
}
export function getTickets(payload: any) {
  return async function(dispatch: any) {
    const tickets = await axios.get(
      `http://localhost:3001/gettickets/${payload}`
    );
    dispatch({
      type: GET_TICKETS,
      payload: tickets.data,
    });
  };
}
