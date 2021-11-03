import { combineReducers } from 'redux';
import { GET_BOARDGAMES, ADD_BOARDGAMES, EDIT_BOARDGAMES, REMOVE_BOARDGAMES, CHANGE_BOARDGAMES } from './actions/boardgames';
import { ADD_GENRE, DELETE_GENRE, EDIT_GENRE, GET_GENRE } from './actions/genre';
import { GET_LENDINFO, UPDATE_LENDINFO } from './actions/lendInfo';

export default combineReducers({
  boardGames, genre, lendInfo
});

function boardGames(state = [], action) {
  switch(action.type) {
    case GET_BOARDGAMES: {
      return action.data;
    }
    case ADD_BOARDGAMES: {
      const newState = [ ...state ];
      newState.push(action.data);
      return newState;
    }
    case EDIT_BOARDGAMES: {
      const newState = [ ...state ];
      const idx = newState.findIndex(item => item.id === action.data.id);
      if (idx === -1) {
        return newState;
      }
      newState[idx] = action.data;
      return newState;
    }
    case REMOVE_BOARDGAMES: {
      const newState = [ ...state ];
      const idx = newState.findIndex(item => item.id === action.id);
      if (idx === -1) {
        return newState;
      }
      newState.splice(idx, 1);
      return newState;
    }
    case CHANGE_BOARDGAMES: {
      const newState = [ ...state ];
      const idx = newState.findIndex(item => item.id === action.id);
      if (idx === -1) {
        return newState;
      }
      newState[idx].available += action.count;
      return newState;
    }
    default: return state;
  }
}

function genre(state = [], action) {
  switch(action.type) {
    case GET_GENRE:
      return action.data;
    case ADD_GENRE: {
      const newState = [...state];
      newState.push(action.data);
      return newState;
    }
    case EDIT_GENRE: 
    case DELETE_GENRE: {
      const newState = [...state];
      const idx = newState.findIndex((item) => item.id === action.data.id)
      if (action.type === EDIT_GENRE) {
        newState[idx] = action.data;
      } else if (action.type === DELETE_GENRE) {
        newState.splice(idx, 1);
      }
      newState[action.data.id] = action.data;
      return newState;
    }
    default: 
      return state;
  }
}

function lendInfo(state = {}, action) {
  switch(action.type) {
    case GET_LENDINFO: {
      const newState = { ...state };
      newState[action.gameId] = action.data;
      return newState;
    }
    case UPDATE_LENDINFO: {
      const newState = { ...state };
      if (!newState[action.data.game]) {
        return newState;
      }
      const idx = newState[action.data.game].findIndex((item) => item.id === action.data.id);
      if (idx === -1)
        newState[action.data.game].push(action.data);
      else
        newState[action.data.game][idx] = action.data;
      
      return newState;
    }
    default:
      return state;
  }
}