import { TransitionMotion, spring } from "react-motion";
import * as React from "react";

interface IProps {
  show: boolean;
  children: React.ReactElement<any>;
}

export const FadeIn: React.SFC<IProps> = ({ show, children }) => {
  return (
    <TransitionMotion
      willEnter={() => ({ opacity: 0 })}
      willLeave={() => ({ opacity: spring(0) })}
      defaultStyles={[{ key: "-", style: { opacity: 0 } }]}
      styles={show ? [{ key: "-", style: { opacity: spring(1) } }] : []}
    >
      {inStyles =>
        inStyles.length > 0 ? (
          <div style={{ opacity: inStyles[0].style.opacity }}>{children}</div>
        ) : (
          <div />
        )
      }
    </TransitionMotion>
  );
};
