import { IMessageProps, Message } from "./Message";
import { render as r, unmountComponentAtNode } from "react-dom";
import * as React from "react";

function messageRender(config: IMessageProps) {
  const container: HTMLDivElement = document.createElement("div");
  document.body.appendChild(container);
  render(config);
  function render(props: IMessageProps) {
    r(<Message {...props} onComplete={destory} />, container);
  }

  function destory() {
    const umount = unmountComponentAtNode(container);
    if (umount && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
  return {
    destory
  };
}

export const message = {
  info: (content: string) => messageRender({ content, type: "info" }),
  warning: (content: string) => messageRender({ content, type: "warning" }),
  danger: (content: string) => messageRender({ content, type: "danger" }),
  success: (content: string) => messageRender({ content, type: "success" })
};
