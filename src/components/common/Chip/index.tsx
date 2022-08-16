import React, {FC, ReactNode} from "react";
import classNames from "classnames";
import "./style.scss";

export interface IChipProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | string;
  active?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export const Chip: FC<IChipProps> = ({
  className,
  color,
  active,
  onClick,
  children,
}) => (
  <div
    className={classNames(
      `chip chip-${color}`,
      { active },
      className
    )}
    onClick={onClick}
    data-testid="chip"
  >
    {children}
  </div>
);
