import * as React from "react";
import { ComponentClass, Component } from "react";

type importFunc = () => Promise<any>;

interface IState {
  component: ComponentClass | null;
}

export function asyncComponent(importComponent: importFunc) {
  return class extends Component<{}, IState> {
    public state: IState = {
      component: null
    };

    public async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component
      });
    }

    public render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
}
