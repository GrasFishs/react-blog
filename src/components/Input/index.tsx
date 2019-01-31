import * as React from "react";
import * as propTypes from "prop-types";
import styles from "./style.scss";
import { Theme } from "../__util/theme";

interface IInputProps extends React.ComponentProps<"input"> {
  theme?: string;
  tip?: string;
}

const Input: React.SFC<IInputProps> = ({
  theme,
  className,
  tip,
  style,
  ...rest
}) => {
  return (
    <div className={styles.item}>
      <input
        className={`${styles[theme!]} ${className ? className : ""}`}
        {...rest}
        required
      />
      {tip ? (
        <label style={{ color: Theme.Color[theme!] }}>{tip}</label>
      ) : rest.name ? (
        <label style={{ color: Theme.Color[theme!] }}>{rest.name}</label>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  tip: propTypes.string,
  className: propTypes.string,
  theme: propTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning"
  ])
};

Input.defaultProps = {
  tip: "",
  theme: "primary"
};

export default Input;
