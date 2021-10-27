import { combineReducers } from 'redux';
import { GET_BOARDGAMES, ADD_BOARDGAMES, EDIT_BOARDGAMES, REMOVE_BOARDGAMES } from './actions/boardgames';
import { ADD_GENRE, DELETE_GENRE, EDIT_GENRE, GET_GENRE } from './actions/genre';

export default combineReducers({
  boardGames, genre
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