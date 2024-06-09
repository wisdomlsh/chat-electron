import React, { useEffect, useState } from "react";
import { Icon, useModel } from "@umijs/max";
import { Input } from "antd";
import ChatControllerPool from "@/services/chat/controller";

import styles from "./index.module.less";

const { TextArea } = Input;

interface IProps {}

function FileUploadTextArea(props: IProps) {
  const { fetchUserInput } = useModel("chat");
  const [userInput, setUserInput] = useState<string>("");
  const [isStop, setIsStop] = useState<boolean>(
    ChatControllerPool.hasPending()
  );
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

  const handleStopClick = () => {
    ChatControllerPool.stopAll();
  };

  useEffect(() => {
    setIsStop(ChatControllerPool.hasPending());
  }, [ChatControllerPool.hasPending()]);

  return (
    <div className={styles.text_footer}>
      <Icon icon="local:upload" className="flex items-end mb-1" />
      <TextArea
        value={userInput}
        className={styles.chat_textarea}
        autoSize={{ minRows: 1, maxRows: 4 }}
        onKeyDown={handleKeyDownClick}
        onInput={handleInput}
      />
      {isStop ? (
        <Icon
          icon="local:stop"
          className="flex items-end mb-1 cursor-pointer"
          onClick={handleStopClick}
        />
      ) : (
        <Icon
          icon="local:send"
          className="flex items-end mb-1 cursor-pointer"
        />
      )}
    </div>
  );
}

export default FileUploadTextArea;
