import * as React from "react";
import styles from "./style.scss";
import * as hljs from "highlight.js";
import * as dayjs from "dayjs";
import * as Markdown from "markdown-it";
import { Button } from "src/components";
import { RouteComponentProps } from "react-router";
import { IUserState } from "../detail/user.model";
import { checkToken } from "src/Hoc/checkToken";

const md = Markdown({
  html: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value;
    }
    return "";
  }
});

interface IProps extends RouteComponentProps {
  user: IUserState;
}

interface IState {
  content: string;
  title: string;
}

class EditArticle extends React.PureComponent<IProps, IState> {
  public state: IState = {
    content: "# " + dayjs().format("YYYY-MM-DD"),
    title: dayjs().format("YYYY-MM-DD")
  };

  private contentNode: React.RefObject<HTMLTextAreaElement> = React.createRef();

  constructor(props: IProps) {
    super(props);
  }

  public handleContentChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ content: e.target.value });
  }

  public handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
    document.title = e.target.value;
  }

  public componentDidMount() {
    this.contentNode.current!.focus();
  }

  public render() {
    return (
      <div className={styles.post}>
        <div className={styles.header}>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange.bind(this)}
          />
          <Button theme="danger" style={{ width: 200 }}>
            发布
          </Button>
        </div>
        <div className={styles.body}>
          <textarea
            ref={this.contentNode}
            className={styles.content}
            value={this.state.content}
            onChange={this.handleContentChange.bind(this)}
          />
          <div
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: md.render(this.state.content) }}
          />
        </div>
      </div>
    );
  }
}

export default checkToken(EditArticle);
