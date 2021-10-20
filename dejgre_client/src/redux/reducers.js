import { combineReducers } from 'redux';
import boardGames from "../apps/boardgames/store/reducers";
import { BEGIN_REQUEST, FAIL_REQUEST, FINISH_REQUEST } from "./actions/requestsInfo";


export default combineReducers({
  boardGames, requests
});

function requests(state = {}, action) {
  let newState = {...state};
  switch(action.type) {
    case BEGIN_REQUEST: 
      newState[action.name] = true;
      return newState;
    case FINISH_REQUEST: 
      delete newState[action.name];
      return newState;
    case FAIL_REQUEST:
      newState[action.name] = false;
      return newState;
    default: return state;
  }
}