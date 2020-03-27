import { Todo, Todos } from '../domain/models';
import { SET, set, add, ADD, default as reducer } from './todos';

describe('todos', () => {
  describe('set', () => {
    it('returns an Action to tell the reducer "set todos"', () => {
      const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]));
      expect(action.type).toBe(SET);
      expect(Todos.getNumof(action.payload.todos)).toBe(2);
    });
  });
  describe('add', () => {
    it('returns an Action to tell the reducer "set todos"', () => {
      const action = add(Todo.factory({ title: 'デザート', detail: 'チーズケーキ' }));
      expect(action.type).toBe(ADD);
      expect(Todos.findByTitle(action.payload, 'デザート').length).toBe(1);
      expect(Todos.findByTitle(action.payload, 'デザート')[0].detail).toBe('チーズケーキ');
    });
  });

  describe('reducer', () => {
    describe('set Action', () => {
      it('returns a new state that has payload of "set Action"', () => {
        const action = set(Todos.factory([{ title: 'foo', detail: 'bar' }, { title: 'buz' }]));
        const setState = reducer(undefined, action);
        expect(Todos.getNumof(setState)).toBe(2);
      });
    });
  });
});
