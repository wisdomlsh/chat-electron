import { useState } from "react";
import { getItem, setItem } from "@/utils/localStorage";
import ChatControllerPool from "@/services/chat/controller";

import ChatGPTApi from "@/services/chat";

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

export function createEmptySession(id?: string): ChatSession {
  return {
    id: id ?? crypto.randomUUID(),
    topic: "新的聊天",
    messages: [],
    lastUpdate: Date.now(),
  };
}

export function createMessage(override: Partial<ChatMessage>): ChatMessage {
  return {
    id: crypto.randomUUID(),
    date: Date.now(),
    role: "user",
    content: "",
    streaming: false,
    ...override,
  };
}

export default () => {
  const DEFAULT_CHAT_STATE: {
    sessions: ChatSession[];
    currentSessionId: string;
  } = getItem("chat") ?? {
    currentSessionId: "",
    sessions: [createEmptySession()],
  };

  //  当前会话的所有信息
  const [chatSession, setChatSession] = useState(DEFAULT_CHAT_STATE);

  const recordState = () => {
    setItem("chat", JSON.stringify(chatSession));
  };

  // 获取当前的session
  const getCurrentSession = (id?: string | null) => {
    if (!id) return;
    return chatSession.sessions.filter((v) => v.id === id)[0];
  };

  // 获取当前选中的sessionId
  const getCurrentId = () => {
    return chatSession.currentSessionId;
  };

  // 修改当前的session的index
  const updateCurrentId = (id: string) => {
    chatSession.currentSessionId = id;
    recordState();
    setChatSession(chatSession);
  };

  const updateCurrentSession = (updater: (session: any) => void) => {
    const sessionId = getCurrentId();
    const currentSession = chatSession.sessions?.filter(
      (v) => v.id === sessionId
    )[0];

    updater(currentSession);
    const data = chatSession.sessions.filter(
      (v) => v?.id !== currentSession?.id
    );
    recordState();
    setChatSession((pre) => {
      return { ...pre, sessions: chatSession.sessions };
    });
  };

  const addSession = () => {
    const data = createEmptySession();
    chatSession.sessions.unshift(data);
    recordState();
    setChatSession(chatSession);
  };

  const deleteSession = (id: string) => {
    chatSession.sessions = chatSession.sessions.filter((v) => v.id !== id);
    recordState();
    setChatSession(chatSession);
  };

  // 第一次进入页面，所有的straming全部设为false

  const stopAllSteaming = () => {
    chatSession.sessions.forEach((v) => {
      v.messages.forEach((item) => (item.streaming = false));
    });
    recordState();
    setChatSession(chatSession);
  };

  const fetchUserInput = async (content: string) => {
    // if (!chatSession.currentSessionId) {
    //   const id = crypto.randomUUID();
    //   flushSync(() => {
    //     setChatSession((pre) => {
    //       return {
    //         currentSessionId: id,
    //         sessions: [createEmptySession(id), ...pre.sessions],
    //       };
    //     });
    //   });
    // }
    const userMessage: ChatMessage = createMessage({
      role: "user",
      content: content,
    });

    const botMessage: ChatMessage = createMessage({
      role: "assistant",
      streaming: true,
    });

    // const messageIndex = getCurrentSession().messages.length + 1;

    // // 保存用户和机器人的消息
    updateCurrentSession((session) => {
      const savedUserMessage = {
        ...userMessage,
      };
      session.messages = session.messages.concat([
        savedUserMessage,
        botMessage,
      ]);
    });

    const api = new ChatGPTApi();

    api.chat({
      config: {
        model: "gpt-3.5-turbo-16k",
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
      },
      onUpdate(message) {
        if (message.length) {
          botMessage.content = message;
        }

        updateCurrentSession((session) => {
          session.messages = session.messages.concat();
        });
      },
      onFinish(message) {
        //结束
        botMessage.streaming = false;
        if (message) {
          botMessage.content = message;
        }
        updateCurrentSession((session) => {
          session.messages = session.messages.concat();
        });
        ChatControllerPool.remove(chatSession.currentSessionId, botMessage.id);
      },
      onError(error) {
        const isAborted = error.message.includes("aborted");
        if (isAborted) return;
        botMessage.content = error;
        botMessage.streaming = false;
        // userMessage.isError = !isAborted;
        // botMessage.isError = !isAborted;
        updateCurrentSession((session) => {
          session.messages = session.messages.concat();
        });
        ChatControllerPool.remove(chatSession.currentSessionId, botMessage.id);
      },
      onController(controller) {
        // collect controller for stop/retry
        ChatControllerPool.addController(
          chatSession.currentSessionId,
          botMessage.id,
          controller
        );
      },
    });
  };

  return {
    chatSession,
    setChatSession,
    getCurrentSession,
    getCurrentId,
    updateCurrentId,
    fetchUserInput,
    addSession,
    deleteSession,
    stopAllSteaming,
    updateCurrentSession,
  };
};
