import * as React from "react";

import styles from "./index.module.less";

export type ButtonType = "primary" | "danger" | "default" | null;

function IconButton(props: {
  onClick?: () => void;
  icon?: JSX.Element;
  type?: ButtonType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`${props?.className}  ${styles["icon-button"]}`}
      onClick={props.onClick}
      disabled={props.disabled}
      role="button"
    >
      {props.icon && (
        <div
          className={
            styles["icon-button-icon"] +
            ` ${props.type === "primary" && "no-dark"}`
          }
        >
          {props.icon}
        </div>
      )}

      {props.text && (
        <div className={styles["icon-button-text"]}>{props.text}</div>
      )}
    </button>
  );
}

export default IconButton;
