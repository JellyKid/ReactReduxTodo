export const ADD_TODO = 'ADD_TODO';
export function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: content
  };
}

export const TOGGLE_TODO = 'TOGGLE_TODO';
export function toggleTodo(key) {
  return {
    type: TOGGLE_TODO,
    payload: key
  };
}

export const SET_VISIBLE = 'SET_VISIBLE';
export function setVisible(filter) {
  return {
    type: SET_VISIBLE,
    payload: filter
  };
}

export const CLEAR_COMPLETE = 'CLEAR_COMPLETE';
export function clearComplete() {
  return {
    type: CLEAR_COMPLETE
  };
}

export const SORT_TODOS = 'SORT_TODOS';
export function sortTodos(method) {
  return {
    type: SORT_TODOS,
    payload: method
  };
}
