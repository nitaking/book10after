// /src/selectors/todos.test.ts
import * as Selectors from './todos';

import * as Domain from '../domain/models';
import { createStore } from '../store';
import { add, toggle } from '../modules/todos';
import sleep from '../lib/sleep';

describe('todos selectors', () => {
  describe('getTodos', () => {
    it('returns array of todos sorted by createdAt desc', async () => {
      const store = createStore();
      store.dispatch(add(Domain.Todo.factory({ title: 'foo' })));
      await sleep(10);
      store.dispatch(add(Domain.Todo.factory({ title: 'bar' })));

      const actual = Selectors.getTodos(store.getState());
      expect(actual.length).toBe(2);
      expect(actual[0].title).toBe('bar');
    });
  });
});
