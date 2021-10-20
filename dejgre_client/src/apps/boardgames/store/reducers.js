import { combineReducers } from 'redux';
import { GET_BOARDGAMES, ADD_BOARDGAMES, EDIT_BOARDGAMES, REMOVE_BOARDGAMES } from './actions/boardgames';

export default combineReducers({
  boardGames
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
      const idx = newState.findIndex(item => item.id === action.data.id);
      if (idx === -1) {
        return newState;
      }
      newState.splice(idx, 1);
      return newState;
    }
    default: return state;
  }
}