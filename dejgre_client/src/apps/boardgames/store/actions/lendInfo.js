import axiosRequests from "../../../../generics/axiosShortcuts";
import { beginRequest, failRequest, finishRequest } from "../../../../redux/actions/requestsInfo";
import { changeBoardGamesAvailable } from "./boardgames";

export const GET_LENDINFO = "GET_LENDINFO";
export const UPDATE_LENDINFO = "UPDATE_LENDINFO";

function getLendInfoData(gameId, data) {
  return {
    type: GET_LENDINFO,
    data,
    gameId
  }
}

function updateLendInfoData(id, data) {
  return {
    type: UPDATE_LENDINFO,
    data,
    id
  }
}


export function getLendInfo(gameId) {
  return (dispatch) => {
    dispatch(beginRequest("lendInfo"))
    axiosRequests.get(
      `/lend/game/?game=${gameId}`,
      ({data}) => {
        dispatch(finishRequest("lendInfo"))
        dispatch(getLendInfoData(gameId, data));
      },
      (error) => {
        dispatch(failRequest("lendInfo"))
      }
    )
  }
}

export function putLendInfo(id) {
  return (dispatch) => {
    dispatch(beginRequest("lendInfo"))
    axiosRequests.put(
      `/lend/game/${id}/return_game/`,
      {},
      ({data}) => {
        dispatch(finishRequest("lendInfo"))
        dispatch(updateLendInfoData(data.game, data));
        dispatch(changeBoardGamesAvailable(data.game, 1));
      },
      (error) => {
        dispatch(failRequest("lendInfo"))
      }
    )
  }
}

export function postLendGame(data, callback = () => null) {
  return (dispatch) => {
    dispatch(beginRequest("lendGame"));
    axiosRequests.post(
      `/lend/game/lend_game/`,
      data,
      ({data}) => {
        dispatch(finishRequest("lendGame"))
        dispatch(updateLendInfoData(data.game, data));
        dispatch(changeBoardGamesAvailable(data.game, -1));
        callback();
      },
      (error) => {
        dispatch(failRequest("lendGame"))
      }
    )
  }
}
