import * as React from "react";
import * as propTypes from "prop-types";
import styles from "./style.scss";
import classNames from "classnames";
import { Theme } from "../__util/theme";

interface IButtonProps extends React.ComponentProps<"button"> {
  theme?: string;
  block?: boolean;
  line?: boolean;
}

const Button: React.SFC<IButtonProps> = ({
  theme,
  className,
  block,
  line,
  style,
  children,
  ...rest
}) => {
  const blockStyle = block ? { width: "100%" } : {};
  const lineStyle = line
    ? {
        background: Theme.Color.pure,
        border: `2px solid ${Theme.Color[theme!]}`,
        color: Theme.Color[theme!],
        fontWeight: 600
      }
    : {};
  const defaultStyle = { ...blockStyle, ...lineStyle };
  return (
    <button
      className={classNames(styles[theme!], className)}
      {...rest}
      style={{ ...defaultStyle, ...style }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  theme: propTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "default"
  ]),
  line: propTypes.bool
};

Button.defaultProps = {
  theme: "default",
  line: false
};

export default Button;
