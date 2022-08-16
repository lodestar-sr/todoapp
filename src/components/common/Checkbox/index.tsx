import React, {FC, useEffect, useState} from "react";
import classNames from "classnames";
import "./style.scss";

export interface ICheckboxProps {
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: FC<ICheckboxProps> = ({
  className,
  checked,
  onChange,
}) => {
  const [value, setValue] = useState(checked);

  useEffect(() => {
    setValue(checked)
  }, [checked]);

  const onToggle = () => {
    setValue(!value);
    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <div
      className={classNames(
        'checkbox',
        { checked },
        className
      )}
      onClick={onToggle}
      data-testid="checkbox"
    >
      <i className="fa fa-check" />
    </div>
  );
};
