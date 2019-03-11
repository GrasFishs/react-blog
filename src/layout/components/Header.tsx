import * as React from "react";
import styles from "./header.scss";
import { IUserState } from "src/modules/user/detail/user.model";
import { Link } from "react-router-dom";
import { Subscription, fromEvent } from "rxjs";
import { map, debounceTime } from "rxjs/operators";
import { Motion, spring } from "react-motion";
import { History } from "history";

interface IProps extends React.ComponentProps<"div"> {
  loginStatus: boolean;
  user: IUserState;
  history: History;
}

interface IState {
  isOnTop: boolean;
  isOver: boolean;
  lastOffset: number;
}

export class Header extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isOnTop: true,
    isOver: false,
    lastOffset: 0
  };

  private scroll: Subscription;
  public componentDidMount() {
    const scroll$ = fromEvent(window, "scroll").pipe(
      debounceTime(60),
      map(() => window.pageYOffset)
    );
    this.scroll = scroll$.subscribe(offset => {
      this.setState({
        isOnTop: offset <= 60,
        isOver: offset > 60 && offset - this.state.lastOffset > 0,
        lastOffset: offset
      });
    });
  }

  public componentWillUnmount() {
    this.scroll.unsubscribe();
  }

  public render() {
    const {
      loginStatus,
      user,
      className,
      style,
      children,
      history
    } = this.props;
    return (
      <Motion
        defaultStyle={{ y: -120 }}
        style={{ y: spring(this.state.isOver ? 0 : -120) }}
      >
        {inStyle => (
          <div>
            <div
              className={`${styles.header} ${
                !this.state.isOnTop ? styles.sticky : ""
              } ${className ? className : ""}`}
              style={{
                ...style,
                transform: `translateY(${this.state.isOnTop ? 0 : inStyle.y}%)`
              }}
            >
              <div className={styles.left}>{inStyle.y}</div>
              <div className={styles.right}>
                {loginStatus ? (
                  <>
                    <div className={styles.username}>{user.user!.username}</div>
                    <img
                      onClick={() =>
                        history.push(`/user/${user.user!.id}`)
                      }
                      className={styles.avatar}
                      src={user.user!.avatar}
                    />
                  </>
                ) : (
                  <Link to={"/login"}>登录</Link>
                )}
              </div>
            </div>
            <div style={{ paddingTop: this.state.isOnTop ? 0 : 60 }}>
              {children}
            </div>
          </div>
        )}
      </Motion>
    );
  }
}
