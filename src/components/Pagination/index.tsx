import * as React from "react";
import styles from "./index.scss";
import classNames from "classnames";
import { range } from "src/tools";

interface IProps {
  page: number;
  total: number;
  size: number;
  pagesCount?: number;
  onChange: (page: number) => void;
}

interface IState {
  min: number;
  max: number;
  currentPage: number;
}

export class Pagenation extends React.PureComponent<IProps, IState> {
  public static defaultProp = {
    page: 1,
    size: 10,
    total: 10,
    pagesCount: 1
  };

  public state: IState = {
    min: 1,
    max: 1,
    currentPage: 1
  };

  public componentDidMount() {
    this.setState({
      max: this.props.pagesCount!,
      currentPage: this.props.page
    });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps !== this.props) {
      const maxPage = Math.ceil(nextProps.total / nextProps.size);
      const { min, max } = this.getMinMax(maxPage);
      this.setState({ min, max });
    }
  }

  private handlePrevNext(num: number, disable: boolean = false) {
    if (!disable) {
      this.setState(
        {
          currentPage: this.state.currentPage + num,
          min: this.state.min + num,
          max: this.state.max + num
        },
        () => {
          this.props.onChange(this.state.currentPage);
        }
      );
    }
  }

  private getMinMax(maxPage: number) {
    const { currentPage } = this.state;
    const LENGTH = this.props.pagesCount!;
    const HALF = Math.floor(LENGTH / 2);
    // 截取一半
    let min = currentPage - HALF > 1 ? currentPage - HALF : 1;
    let max = currentPage + HALF < maxPage ? currentPage + HALF : maxPage;
    // 防止 max 和 min 之间长度 < LENGTH
    min = min > 1 && max - min < LENGTH ? max - LENGTH + 1 : min;
    max = max < maxPage && max - min < LENGTH ? min + LENGTH - 1 : max;
    return { min, max };
  }

  private handleChange(currentPage: number, maxPage: number) {
    const { min, max } = this.getMinMax(maxPage);
    this.setState({ currentPage, min, max }, () => {
      this.props.onChange(this.state.currentPage);
    });
  }

  public render() {
    const { currentPage, min, max } = this.state;
    const maxPage = Math.ceil(this.props.total / this.props.size);
    return (
      <div className={styles.pagination}>
        <div
          onClick={this.handleChange.bind(this, 1)}
          className={classNames({
            [styles.page]: true,
            [styles.diable]: currentPage <= 1
          })}
        >
          {"<<"}
        </div>
        <div
          onClick={this.handlePrevNext.bind(this, -1, currentPage <= 1)}
          className={classNames({
            [styles.page]: true,
            [styles.diable]: currentPage <= 1
          })}
        >
          {"<"}
        </div>
        {range(min, max).map(page => (
          <div
            key={page}
            className={classNames({
              [styles.page]: true,
              [styles.active]: page === currentPage
            })}
            onClick={this.handleChange.bind(this, page)}
          >
            {page}
          </div>
        ))}
        <div
          className={classNames({
            [styles.page]: true,
            [styles.diable]: currentPage === maxPage
          })}
          onClick={this.handlePrevNext.bind(this, 1, currentPage === maxPage)}
        >
          {">"}
        </div>
        <div
          className={classNames({
            [styles.page]: true,
            [styles.diable]: currentPage === maxPage
          })}
          onClick={this.handleChange.bind(this, maxPage)}
        >
          {">>"}
        </div>
      </div>
    );
  }
}
