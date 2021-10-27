import axiosRequests from "../../../../generics/axiosShortcuts";
import { beginRequest, failRequest, finishRequest } from "../../../../redux/actions/requestsInfo";

export const GET_GENRE = "GET_GENRE";
export const ADD_GENRE = "ADD_GENRE";
export const EDIT_GENRE = "EDIT_GENRE";
export const DELETE_GENRE = "DELETE_GENRE";

function getGenreData(data) {
  return {
    type: GET_GENRE,
    data
  }
}

function addGenreData(data) {
  return {
    type: ADD_GENRE,
    data
  }
}

function editGenreData(data) {
  return {
    type: EDIT_GENRE,
    data
  }
}

function deleteGenreData(data) {
  return {
    type: DELETE_GENRE,
    data
  }
}

export function getGenre() {
  return (dispatch) => {
    dispatch(beginRequest("genre"))
    axiosRequests.get(
      "/magazine/gamegenre/",
      ({data}) => {
        dispatch(finishRequest("genre"))
        dispatch(getGenreData(data));
      },
      (error) => {
        dispatch(failRequest("genre"))
      }
    )
  }
}

export function postGenre(data) {
  return (dispatch) => {
    dispatch(beginRequest("genre"))
    axiosRequests.post(
      "/magazine/gamegenre/",
      data,
      ({data}) => {
        dispatch(finishRequest("genre"))
        dispatch(addGenreData(data));
      },
      (error) => {
        dispatch(failRequest("genre"))
      }
    )
  }
}

export function putGenre(data) {
  return (dispatch) => {
    dispatch(beginRequest("genre"))
    axiosRequests.put(
      `/magazine/gamegenre/${data.id}/`,
      data,
      ({data}) => {
        dispatch(finishRequest("genre"))
        dispatch(editGenreData(data));
      },
      (error) => {
        dispatch(failRequest("genre"))
      }
    )
  }
}

export function deleteGenre(data) {
  return (dispatch) => {
    dispatch(beginRequest("genre"))
    axiosRequests.delete(
      `/magazine/gamegenre/${data.id}/`,
      () => {
        dispatch(finishRequest("genre"))
        dispatch(deleteGenreData(data.id));
      },
      (error) => {
        dispatch(failRequest("genre"))
      }
    )
  }
}
