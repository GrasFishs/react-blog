import * as React from "react";
import { ITag } from "src/data/Tag";
import styles from "./tags.scss";
import classNames from "classnames";
// import { Subscription, fromEvent } from "rxjs";
// import { throttleTime, map } from "rxjs/operators";

interface IProps {
  tags: ITag[];
}

interface IState {
  top: number;
  left: number;
  isOver: boolean;
}

export class Tags extends React.PureComponent<IProps, IState> {
  public state: IState = {
    top: 0,
    left: 0,
    isOver: false
  };
  // private scroll: Subscription;
  // private ref = React.createRef<HTMLDivElement>();

  // public componentDidMount() {
  //   this.setState({
  //     top: this.ref.current!.offsetTop,
  //     left: this.ref.current!.offsetLeft - 10
  //   });
  //   const scroll$ = fromEvent(window, "scroll").pipe(
  //     throttleTime(60),
  //     map(() => window.pageYOffset)
  //   );
  //   this.scroll = scroll$.subscribe(top => {
  //     this.setState({ isOver: top > this.state.top });
  //   });
  // }

  // public componentWillUnmount() {
  //   this.scroll.unsubscribe();
  // }

  public render() {
    return (
      <div
        className={classNames({
          [styles.tags]: true,
          [styles.sticky]: this.state.isOver
        })}
        style={{
          top: this.state.top,
          left: this.state.left,
          marginLeft: this.state.isOver ? 0 : 10
        }}
        // ref={this.ref}
      >
        <div className={styles.title}>标签</div>
        {this.props.tags.map(tag => (
          <span className={styles.tag} key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
    );
  }
}
