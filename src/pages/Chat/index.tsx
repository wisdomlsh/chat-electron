import { useModel } from "@umijs/max";
import { Input, theme } from "antd";
import React from "react";

const Chat: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel("@@initialState");
  return (
    <>
      <div className="flex flex-col h-full relative ">
        <main className="flex-1">3123123</main>
        <Input style={{ height: 100 }} />
      </div>
    </>
  );
};

export default Chat;
