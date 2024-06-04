import { useModel } from "@umijs/max";
import ChatLayout from "./components/ChatLayout";

import { theme } from "antd";

import React from "react";

const Chat: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel("@@initialState");

  return (
    <>
      <ChatLayout />
    </>
  );
};

export default Chat;
