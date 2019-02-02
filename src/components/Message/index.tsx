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
  info: (content: string, duration?: number) =>
    messageRender({ content, type: "info", duration }),
  warning: (content: string, duration?: number) =>
    messageRender({ content, type: "warning", duration }),
  danger: (content: string, duration?: number) =>
    messageRender({ content, type: "danger", duration }),
  success: (content: string, duration?: number) =>
    messageRender({ content, type: "success", duration })
};
