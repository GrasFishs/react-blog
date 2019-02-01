import * as React from "react";
import { Modal } from "./Modal";
import { render as r, unmountComponentAtNode } from "react-dom";
import { Button } from "..";
import {
  IoIosCloseCircleOutline,
  IoIosCheckmarkCircleOutline,
  IoIosHelpCircleOutline
} from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";
import { Theme } from "../__util/theme";

interface IConfig {
  isShow?: boolean;
  title?: string;
  content: string;
  type?: "success" | "info" | "danger" | "warning";
  onOk: () => void;
}

const typeMap = {
  danger: (
    <IoIosCloseCircleOutline
      style={{ color: Theme.Color.danger, fontSize: 30 }}
    />
  ),
  success: (
    <IoIosCheckmarkCircleOutline
      style={{ color: Theme.Color.success, fontSize: 30 }}
    />
  ),
  info: (
    <IoIosHelpCircleOutline
      style={{ color: Theme.Color.secondary, fontSize: 30 }}
    />
  ),
  warning: (
    <FiAlertCircle style={{ color: Theme.Color.warning, fontSize: 30 }} />
  )
};

export function Dialog(config: IConfig) {
  const container: HTMLDivElement = document.createElement("div");
  document.body.appendChild(container);
  render({ ...config, isShow: true });
  return {
    close
  };

  function ConfigDialog(props: IConfig) {
    return (
      <Modal
        title={props.title}
        isShow={props.isShow!}
        closeable={false}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 10
            }}
          >
            <Button
              theme={"danger"}
              onClick={() => {
                props.onOk();
                close(props);
                destroy();
              }}
            >
              好的
            </Button>
          </div>
        }
      >
        {props.type ? (
          <div style={{ display: "flex", padding: 20 }}>
            <div style={{ marginRight: 20 }}>{typeMap[props.type]}</div>
            <div style={{ marginRight: 30 }}>{props.content}</div>
          </div>
        ) : (
          props.content
        )}
      </Modal>
    );
  }

  function destroy() {
    const timer = setTimeout(() => {
      const umount = unmountComponentAtNode(container);
      if (umount) {
        document.body.removeChild(container);
        clearTimeout(timer);
      }
    }, 300);
  }

  function close(props: IConfig) {
    render({ ...props, isShow: false });
  }

  function render(props: IConfig) {
    r(<ConfigDialog {...props} />, container);
  }
}
