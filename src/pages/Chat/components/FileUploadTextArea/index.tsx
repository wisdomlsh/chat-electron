import React, { useState } from "react";
import { Icon, useModel } from "@umijs/max";
import { Input } from "antd";
import styles from "./index.module.less";

const { TextArea } = Input;

interface IProps {}

function FileUploadTextArea(props: IProps) {
  const { fetchUserInput, addSession, chatSession } = useModel("chat");
  const [userInput, setUserInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    setUserInput(value);
  };

  const handleKeyDownClick = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      fetchUserInput(userInput);
      setUserInput("");
      e.preventDefault();
    }
  };

  return (
    <div className={styles.text_footer}>
      <Icon icon="local:upload" className="flex items-center" />
      <TextArea
        value={userInput}
        className={styles.chat_textarea}
        autoSize={{ minRows: 1, maxRows: 4 }}
        onKeyDown={handleKeyDownClick}
        onInput={handleInput}
      />
      <Icon icon="local:send" className="flex items-center" />
    </div>
  );
}

export default FileUploadTextArea;
