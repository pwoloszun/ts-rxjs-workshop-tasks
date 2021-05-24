interface Todo {
  id: number;
  title: string;
  description?: string;
}

// ======
interface Action {
  type: string;
  payload?: any;
}


class FetchTodosRequestAction implements Action {
  type = 'TODOS/FETCH_REQUEST';
}

class FetchTodosSuccessAction implements Action {
  type = 'TODOS/FETCH_SUCCESS';

  constructor(public payload: Todo[]) {
  }
}

class RemoveTodoAction implements Action {
  type = 'TODOS/REMOVE';

  constructor(public payload: number) {
  }
}

// alias type
type TodoAction = FetchTodosRequestAction
  | FetchTodosSuccessAction
  | RemoveTodoAction;

// client code
function reduce(state: any, action: TodoAction) {
  switch (action.type) {
    case 'TODOS/FETCH_REQUEST': {
      // ...
    }
      break;
    case 'TODOS/REMOVE': {
      const todoId: number = (<RemoveTodoAction>action).payload;
      // ...
    }
      break;
    case 'TODOS/FETCH_SUCCESS': {
      const todos: Todo[] = (<FetchTodosSuccessAction>action).payload;
      // ...
    }
      break;
    default: {
      return state;
    }
  }
}

function unionExample() {
  const state = {};
  reduce(state, new FetchTodosRequestAction());
  reduce(state, new FetchTodosSuccessAction([]));
  reduce(state, new RemoveTodoAction(123));
}

export function unionsAliasesApp() {
  unionExample();
}
