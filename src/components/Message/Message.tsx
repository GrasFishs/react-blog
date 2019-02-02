import * as React from "react";
import { TransitionMotion, spring } from "react-motion";
import { Theme } from "../__util/theme";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaQuestionCircle
} from "react-icons/fa";
import styles from "./style.scss";

export interface IMessageProps {
  content: string | JSX.Element;
  duration?: number;
  type?: "success" | "warning" | "danger" | "info";
  onComplete?: () => void;
}

interface IMessageState {
  show: boolean;
}

const typeMap = {
  success: {
    color: Theme.Color.success,
    icon: <FaCheckCircle style={{ color: Theme.Color.pure }} />
  },
  warning: {
    color: Theme.Color.warning,
    icon: <FaExclamationCircle style={{ color: Theme.Color.pure }} />
  },
  danger: {
    color: Theme.Color.danger,
    icon: <FaTimesCircle style={{ color: Theme.Color.pure }} />
  },
  info: {
    color: Theme.Color.pure,
    icon: <FaQuestionCircle style={{ color: Theme.Color.primary }} />
  }
};

const MessagePanel: React.SFC<IMessageProps> = props => (
  <div
    className={styles.panel}
    style={{
      background: props.type ? typeMap[props.type].color : typeMap.info.color,
      color: props.type === "info" || !props.type ? "rgba(0,0,0,80)" : "#FFFFFF"
    }}
  >
    {props.type ? (
      <div style={{ marginRight: 10 }}>{typeMap[props.type].icon}</div>
    ) : null}
    {props.content}
  </div>
);

export class Message extends React.PureComponent<IMessageProps, IMessageState> {
  public static defaultProps = {
    duration: 1200
  };
  public state: IMessageState = {
    show: true
  };

  private timer: number | null;
  public componentDidMount() {
    this.startTick();
  }

  private startTick = () => {
    this.stopTick();
    this.timer = window.setTimeout(() => {
      this.setState({ show: false });
      setTimeout(() => {
        if (this.props.onComplete) {
          this.props.onComplete();
        }
      }, 200);
    }, this.props.duration);
  };

  private stopTick = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  };

  public componentWillUnmount() {
    this.stopTick();
  }

  public render() {
    return (
      <TransitionMotion
        styles={
          this.state.show ? [{ key: "message", style: { y: spring(0) } }] : []
        }
        willLeave={() => ({ y: spring(-200) })}
        defaultStyles={[{ key: "message", style: { y: -100 } }]}
      >
        {inStyles =>
          inStyles.length === 1 ? (
            <div
              className={styles.message}
              key={"message"}
              onMouseEnter={this.stopTick}
              onMouseLeave={this.startTick}
              onTouchStart={this.stopTick}
              onTouchEnd={this.stopTick}
              style={{ transform: `translate(-50%,${inStyles[0].style.y}%)` }}
            >
              <MessagePanel {...this.props} />
            </div>
          ) : (
            <div />
          )
        }
      </TransitionMotion>
    );
  }
}
