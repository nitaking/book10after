// /src/usecases/todos.test.ts
import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { AppState } from '../modules';
import { ADD, REMOVE, TOGGLE, UPDATE } from '../modules/todos';
import * as Usecases from './todos';

const middlewares = [thunk];
const mockStore = configureMockStore<AppState, ThunkDispatch<AppState, void, AnyAction>>(middlewares);

describe('todos usecases', () => {
  describe('addAndSync', () => {
    it('returns actions', () => {
      const store = mockStore({
        todos: {},
      });

      const action = Usecases.addAndSync('me', { title: 'foo' });
      return store.dispatch(action).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(1);

        const [dispatchedAction] = dispatchedActions;
        expect(dispatchedAction.type).toBe(ADD);
        expect(dispatchedAction.payload.todo.title).toBe('foo');
      });
    });
  });

  // 略
});
