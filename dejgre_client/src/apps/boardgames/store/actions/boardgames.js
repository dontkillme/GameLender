import axiosRequests from "../../../../generics/axiosShortcuts";
import { finishRequest, beginRequest, failRequest } from "../../../../redux/actions/requestsInfo";

export const GET_BOARDGAMES = "GET_BOARDGAMES";
export const ADD_BOARDGAMES = "ADD_BOARDGAMES";
export const EDIT_BOARDGAMES = "EDIT_BOARDGAMES";
export const REMOVE_BOARDGAMES = "REMOVE_BOARDGAMES";

export const getBoardGamesData = (data) => ({
  type: GET_BOARDGAMES,
  data
});

export const addBoardGamesData = (data) => ({
  type: ADD_BOARDGAMES,
  data
});

export const editBoardGamesData = (data) => ({
  type: EDIT_BOARDGAMES,
  data
});

export const removeBoardGamesData = (id) => ({
  type: REMOVE_BOARDGAMES,
  id
});

export function getBoardGames() {
  return (dispatch) => {
    dispatch(beginRequest("boardGames"));
    return axiosRequests.get(
      '/magazine/boardgame/', 
      (respData) => {
        dispatch(getBoardGamesData(respData));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}

export function postBoardGames(data) {
  return (dispatch) => {
    dispatch(beginRequest("boardGames"));
    return axiosRequests.post(
      '/magazine/boardgame/',
      data,
      (respData) => {
        dispatch(postBoardGamesData(respData));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}

export function putBoardGames(data) {
  return (dispatch) => {
    dispatch(beginRequest("boardGames"));
    return axiosRequests.put(
      `/magazine/boardgame/${data.id}/`,
      data,
      (respData) => {
        dispatch(putBoardGamesData(respData));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}

export function removeBoardGames(data) {
  return (dispatch) => {
    dispatch(beginRequest("boardGames"));
    return axiosRequests.delete(
      `/magazine/boardgame/${data.id}/`,
      (respData) => {
        dispatch(removeBoardGamesData(data.id));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}