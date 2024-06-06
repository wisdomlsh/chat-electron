import React from "react";
import Sider from "../Sider";
import _Chat from "../_Chat";
import "@/styles/markdown.less";
import "@/styles/highlight.less";

import styles from "./index.module.less";
import FileUploadTextArea from "@/pages/Chat/components/FileUploadTextArea";

const ChatLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full">
      <Sider />
      <div className=" flex flex-1 justify-center bg-white">
        <div
          className={`flex flex-col h-full w-full  relative  bg-white ${styles.chat_body}`}
        >
          <_Chat />
          <footer className={styles.footer}>
            <FileUploadTextArea />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
