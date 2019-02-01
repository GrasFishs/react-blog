import * as React from "react";
import { TransitionMotion, spring, presets } from "react-motion";
import styles from "./style.scss";
import { IoIosClose } from "react-icons/io";
import Button from "../Button";

export interface IModalProps {
  isShow: boolean;
  title?: string | JSX.Element;
  header?: string | JSX.Element;
  footer?: string | JSX.Element;
  closeable?: boolean;
  onHide?: () => void;
  onOk?: () => void;
}

const Panel: React.SFC<IModalProps> = ({
  isShow,
  children,
  title,
  header,
  closeable,
  footer,
  onHide,
  onOk
}) => (
  <TransitionMotion
    willEnter={() => ({ scale: 0 })}
    willLeave={() => ({ scale: spring(0, { stiffness: 300 }) })}
    defaultStyles={[{ key: "panel", style: { scale: 0 } }]}
    styles={isShow ? [{ key: "panel", style: { scale: spring(1) } }] : []}
  >
    {innerStyles =>
      innerStyles[0] ? (
        <div
          className={styles.panel}
          key={innerStyles[0].key}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          style={{
            transform: `scale(${innerStyles[0].style.scale})`
          }}
        >
          {header ? (
            header
          ) : title ? (
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
              {closeable ? (
                <IoIosClose className={styles.close} onClick={onHide} />
              ) : null}
            </div>
          ) : null}

          {children}
          {footer ? (
            footer
          ) : (
            <div className={styles.footer}>
              <Button className={styles.btn} onClick={onHide}>
                取消
              </Button>
              <Button className={styles.btn} theme={"primary"} onClick={onOk}>
                确定
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div />
      )
    }
  </TransitionMotion>
);

Panel.defaultProps = {
  closeable: true
};

export class Modal extends React.PureComponent<IModalProps> {
  private willEnter() {
    return {
      opacity: 0
    };
  }

  private willLeave() {
    return {
      opacity: spring(0, presets.stiff)
    };
  }

  public render() {
    const { children, ...rest } = this.props;
    return (
      <TransitionMotion
        styles={
          this.props.isShow
            ? [{ key: "overlap", style: { opacity: spring(1, presets.stiff) } }]
            : []
        }
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {inStyles =>
          inStyles.length > 0 ? (
            <div
              onClick={this.props.onHide}
              className={styles.overlap}
              key={inStyles[0].key}
              style={{
                opacity: inStyles[0].style.opacity
              }}
            >
              <Panel {...rest}>{children}</Panel>
            </div>
          ) : (
            <div />
          )
        }
      </TransitionMotion>
    );
  }
}
