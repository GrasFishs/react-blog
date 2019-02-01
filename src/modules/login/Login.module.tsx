import * as React from "react";
import {
  ILoginAction,
  loginActions,
  loginEffects,
  ILoginState
} from "./login.model";
import { connect } from "react-redux";
import styles from "./login.scss";
import { Input, Button } from "src/components";
import { RouteComponentProps } from "react-router";
import { EffectDispatch, IStateRoot } from 'src/reducers';

interface ILoginProps extends RouteComponentProps {
  login: ILoginState;
  dispatch: EffectDispatch<ILoginAction>;
}

const Login: React.SFC<ILoginProps> = props => {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    props.dispatch(loginActions.setUsername(e.target["username"].value));
    props.dispatch(loginActions.setPassword(e.target["password"].value));
    props
      .dispatch(loginEffects.login())
      .then(({ id }) => props.history.replace("/index/user/" + id))
      .catch(err => alert("fail" + err));
  }
  return (
    <div className={styles.login}>
      <div className={styles.panel}>
        <form onSubmit={handleSubmit}>
          <Input tip="用户名" type="text" name="username" />
          <Input theme="danger" tip="密码" type="password" name="password" />
          <Button className={styles.submit} theme="warning" block type="submit">
            登录
          </Button>
        </form>
      </div>
    </div>
  );
};
export default connect(({ login }: IStateRoot) => ({ login }))(Login);
