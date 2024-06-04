import { useCallback, useState } from "react";

export type ChatMessage = {
  date: number;
  streaming?: boolean;
  isError?: boolean;
  id: string;
  role: string;
  content: string;
};

export interface ChatSession {
  id: string;
  topic: string;
  messages: ChatMessage[];
  lastUpdate: number;
}

function createEmptySession(): ChatSession {
  return {
    id: window.crypto.randomUUID(),
    topic: "新的聊天",
    messages: [
      {
        content: "你好",
        role: "user",
        date: Date.now(),
        streaming: false,
        id: window.crypto.randomUUID(),
      },
      {
        content: "你好，我是ChatGpt",
        role: "assistant",
        date: Date.now(),
        streaming: false,
        id: window.crypto.randomUUID(),
      },
    ],
    lastUpdate: Date.now(),
  };
}

export default () => {
  const DEFAULT_CHAT_STATE = {
    sessions: [createEmptySession(), createEmptySession()],
    currentSessionIndex: 0,
  };

  //  当前会话的所有信息
  const [chatSession, setChatSession] = useState(DEFAULT_CHAT_STATE);

  // 获取当前的session
  const getCurrentSession = useCallback(() => {
    return chatSession.sessions[chatSession.currentSessionIndex];
  }, []);

  // 获取当前选中的session
  const getCurrentIndex = useCallback(() => {
    return chatSession.currentSessionIndex;
  }, []);

  // 修改当前的session的index
  const updateCurrentIndex = (index: number) => {
    setChatSession((pre) => {
      return { ...pre, currentSessionIndex: index };
    });
  };
  return {
    chatSession,
    setChatSession,
    getCurrentSession,
    getCurrentIndex,
    updateCurrentIndex,
  };
};
