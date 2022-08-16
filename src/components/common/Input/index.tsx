import React, {FC, KeyboardEventHandler, useEffect, useState} from "react";
import classNames from "classnames";
import "./style.scss";

export interface IInputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  onInputFinish?: (newValue: string) => void;
}

export const Input: FC<IInputProps> = ({
  className,
  placeholder,
  value,
  onChange,
  onInputFinish,
}) => {
  const [text, setText] = useState(value || "");

  useEffect(() => {
    setText(value || "");
  }, [value]);

  const onChangeValue = (newValue: string) => {
    setText(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && onInputFinish) {
      onInputFinish(text);
    }
  };

  return (
    <input
      className={classNames("form-control", className)}
      value={text}
      placeholder={placeholder}
      onChange={(e) => onChangeValue(e.target.value)}
      onKeyDown={onKeyDown}
      data-testid="input"
    />
  );
};
