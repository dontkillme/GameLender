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
      ({data}) => {
        dispatch(getBoardGamesData(data));
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
      ({data}) => {
        dispatch(addBoardGamesData(data));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}

export function putBoardGames(data) {
  data.genre_id = data.genre;
  delete data.genre;
  return (dispatch) => {
    dispatch(beginRequest("boardGames"));
    const tmpData = {...data};
    delete tmpData.tags;
    return axiosRequests.put(
      `/magazine/boardgame/${data.id}/`,
      tmpData,
      ({data}) => {
        dispatch(editBoardGamesData(data));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}

export function deleteBoardGames(id) {
  return (dispatch) => {
    dispatch(beginRequest("boardGames"));
    return axiosRequests.delete(
      `/magazine/boardgame/${id}/`,
      (respData) => {
        dispatch(removeBoardGamesData(id));
        dispatch(finishRequest("boardGames"));
      },
      (error) => {
        dispatch(failRequest("boardGames"));
      }
    );
  }
}