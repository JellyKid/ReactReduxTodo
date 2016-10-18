import { INITIAL_STATE } from './initialState';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBLE, CLEAR_COMPLETE, SORT_TODOS } from './actions';
import { addTodo, toggleTodo, setVisible, clearComplete, sortTodos } from './pureFunc';

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case ADD_TODO:
      return addTodo(state, action.payload);
    case TOGGLE_TODO:
      return toggleTodo(state, action.payload);
    case SET_VISIBLE:
      return setVisible(state, action.payload);
    case CLEAR_COMPLETE:
      return clearComplete(state);
    case SORT_TODOS:
      return sortTodos(state, action.payload);
    default:
      return state;
  }
}
