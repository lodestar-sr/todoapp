import React, {FC, useEffect, useState} from "react";
import classNames from "classnames";
import {Checkbox, Input} from "../../index";
import {ITodo} from "../../../utils/interfaces";
import "./style.scss";

export interface ITodoItemProps {
  className?: string;
  todo: ITodo;
  invisible?: boolean
  onChange(todo: ITodo): void;
  onDelete(todo: ITodo): void;
}

export const TodoItem: FC<ITodoItemProps> = ({
  className,
  todo,
  invisible,
  onChange,
  onDelete,
}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const onComplete = (completed: boolean) => {
    onChange({
      ...todo,
      completed,
    });
  };

  const onEdit = () => {
    setEditing(true);
    setText(todo.text);
  };

  const onSave = () => {
    onChange({
      ...todo,
      text,
    });
    setEditing(false);
  };

  const onRemove = () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setDeleting(true);
    setTimeout(() => {
      onDelete(todo);
    }, 500);
  };

  return (
    <div
      className={classNames(
        'todo-item',
        { loading },
        { editing },
        { deleting },
        { 'd-none': invisible },
        { completed: todo.completed },
        className
      )}
      data-testid="todo-item"
    >
      <Checkbox checked={todo.completed} onChange={onComplete} />

      {editing ? (
        <Input
          className="flex-grow-1 flex-shrink-1 text-lg px-3 py-2 mx-4"
          placeholder={todo.text}
          value={text}
          onInputFinish={onSave}
          onChange={setText}
        />
      ) : (
        <div className="cursor-default mx-4">{todo.text}</div>
      )}

      {editing ? (
        <button className="btn btn-success-outline btn-icon btn-sm ml-auto" disabled={!text} onClick={onSave} data-testid="save-button">
          <i className="fa fa-save" />
        </button>
      ) : (
        <button className="btn btn-primary-outline btn-icon btn-sm ml-auto" onClick={onEdit} data-testid="edit-button">
          <i className="fa fa-edit" />
        </button>
      )}

      <button className="btn btn-danger-outline btn-icon btn-sm ml-2" onClick={onRemove} data-testid="delete-button">
        <i className="fa fa-trash" />
      </button>
    </div>
  );
};
