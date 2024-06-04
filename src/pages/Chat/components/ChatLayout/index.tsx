import React from "react";
import { Input } from "antd";
import Sider from "../Sider";
import _Chat from "../_Chat";

import { Icon } from "@umijs/max";
import styles from "./index.module.less";

const { TextArea } = Input;

const ChatLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <Sider />
      <div className=" flex flex-1 justify-center bg-white">
        <div
          className={`flex flex-col h-full w-8/12 relative p-4 bg-white ${styles.chat_body}`}
        >
          <_Chat />
          <footer className={styles.footer}>
            <Icon icon="local:upload" className="pb-1" />
            <TextArea
              className={styles.chat_textarea}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
            <Icon icon="local:send" className="pb-1" />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
