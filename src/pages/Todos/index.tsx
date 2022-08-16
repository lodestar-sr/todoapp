import React, {FormEvent, useEffect, useMemo, useState} from "react";
import Reorder, {reorder} from "react-reorder";
import {Chip, Input, TodoItem} from "../../components";
import {ITodo} from "../../utils/interfaces";
import "./style.scss";

const Todos = () => {
  const [todos, _setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [maxId, setMaxId] = useState(0);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    try {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]');
      _setTodos(todos);
      setMaxId(Math.max(0, ...todos.map((item) => item.id)));
    } catch {}
  }, []);

  const completedCount = useMemo(() => (
    todos.filter((item) => item.completed).length
  ), [todos]);

  const setTodos = (todos: ITodo[]) => {
    _setTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const onAddNewTodo = (e: FormEvent) => {
    e.preventDefault();

    if (newTodo) {
      setTodos([
        { id: maxId + 1, text: newTodo, completed: false },
        ...todos,
      ]);
      setNewTodo('');
      setMaxId(maxId + 1);

      const container = document.querySelector('.todo-list') as HTMLDivElement;
      container.scrollTop = 0;
    }
  };

  const onChangeTodo = (todo: ITodo) => {
    setTodos(todos.map((item) => (
      item.id === todo.id ? todo : item
    )));
  };

  const onDeleteTodo = (todo: ITodo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const onClearCompletedTodos = () => {
    if (window.confirm('Are you sure you want to clear completed tasks?')) {
      setTodos(todos.filter((item) => !item.completed));
    }
  };

  const onReorder = (_, previousIndex, nextIndex) => {
    setTodos(reorder(todos, previousIndex, nextIndex));
  };

  return (
    <div className="todos-page">
      <div className="content">
        <h1 className="text-white text-center mb-4">Todo</h1>
        <div className="white-card flex-grow-1 flex-shrink-1 d-flex flex-column overflow-auto">
          <form className="d-flex align-items-center border-b px-4 py-3" onSubmit={onAddNewTodo} data-testid="todo-create-form">
            <Input
              className="flex-grow-1 text-lg mr-4"
              value={newTodo}
              placeholder="Create Some Tasks ..."
              onChange={setNewTodo}
            />
            <button className="btn btn-primary btn-icon" disabled={!newTodo}>
              <i className="fa fa-plus" />
            </button>
          </form>

          <div className="d-flex align-items-center flex-wrap border-b px-4 py-3">
            <Chip className="mr-3" color="primary" active={tab === 'all'} onClick={() => setTab('all')}>
              All Tasks: {todos.length}
            </Chip>
            <Chip className="mr-3" color="danger" active={tab === 'active'} onClick={() => setTab('active')}>
              Incomplete: {todos.length - completedCount}
            </Chip>
            <Chip className="mr-3" color="success" active={tab === 'completed'} onClick={() => setTab('completed')}>
              Complete: {completedCount}
            </Chip>
          </div>

          <div className="todo-list flex-grow-1 flex-shrink-1" data-testid="todo-list">
            <Reorder
              reorderId="todo-list"
              lock="horizontal"
              onReorder={onReorder}
            >
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="todo-item-wrapper"
                >
                  <TodoItem
                    className="border-b"
                    todo={todo}
                    invisible={(tab === 'completed' && !todo.completed) || (tab === 'active' && todo.completed)}
                    onChange={onChangeTodo}
                    onDelete={onDeleteTodo}
                  />
                </div>
              ))}
            </Reorder>

          </div>

          <div>
            <button
              className="btn btn-white w-full text-lg font-bold p-4"
              disabled={!completedCount}
              onClick={onClearCompletedTodos}
            >
              Clear Completed Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
