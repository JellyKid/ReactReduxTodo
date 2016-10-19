import update from 'react-addons-update';

function sortFun(direction, sortBy) {
  let mod = direction ? 1 : -1;
  return (A,B) => {

    let a = A[sortBy];
    let b = B[sortBy];

    if(sortBy === 'content'){
      a = a.toUpperCase();
      b = b.toUpperCase();
    }

    if(a < b){
      return -1 * mod;
    }
    if(a > b){
      return 1 * mod;
    }
    return 0;
  };
}

export function addTodo(state, content) {
  return update(state, {
    todos: {
      $push: [{
        complete: false,
        content: content,
        id: Date.now()
      }]
    },
    activeTally: {$set: state.activeTally + 1}
  });
}

export function toggleTodo(state, key) {
  return update(state, {
    todos: {
      $set: update(state.todos, {
        [key]: {
          complete: {$set: !state.todos[key].complete}
        }
      })
    },
    activeTally: {
      $set: (state.activeTally) + (state.todos[key].complete ? 1 : -1)
    },
    completeTally: {
      $set: (state.completeTally) + (!state.todos[key].complete ? 1 : -1)
    }
  });
}

export function clearComplete(state) {
  return update(state, {
    todos: {
      $set: state.todos.filter((todo) => {
        return !todo.complete;
      })
    },
    completeTally: {
      $set: 0
    }
  });
}

export function setVisible(state, filter) {
  return update(state, {
    visible: {
      $set: filter
    }
  });
}

export function sortTodos(state, method) {
  //if sorting by same method swap sort direction, othewise sort desc
  let sortDirection = method === state.sort ? !state.sortDesc : true;
  return update(state, {
    todos: {
      $set : state.todos.slice().sort(sortFun(sortDirection, method))
    },
    sort: {
      $set: method
    },
    sortDesc: {
      $set : sortDirection 
    }
  });
}
