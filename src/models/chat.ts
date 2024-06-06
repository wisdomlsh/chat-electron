import { useCallback, useState } from "react";
import { setItem } from "@/utils/localStorage";

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

function createEmptySession(id?: string): ChatSession {
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
    currentSessionIndex: number;
  } = {
    sessions: [createEmptySession()],
    currentSessionIndex: 0,
  };

  //  当前会话的所有信息
  const [chatSession, setChatSession] = useState(DEFAULT_CHAT_STATE);

  // 获取当前的session
  const getCurrentSession = useCallback(() => {
    return chatSession.sessions[chatSession.currentSessionIndex];
  }, [chatSession.currentSessionIndex]);

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

  const updateCurrentSession = (updater: (session: any) => void) => {
    const currentSession = getCurrentSession();
    updater(currentSession);
    const data = chatSession.sessions.filter(
      (v) => v?.id !== currentSession?.id
    );
    setChatSession((pre) => {
      setItem(
        "chat",
        JSON.stringify({ ...pre, sessions: [currentSession, ...data] })
      );
      return { ...pre, sessions: [currentSession, ...data] };
    });
  };

  const addSession = () => {
    const data = createEmptySession();
    setChatSession((pre) => {
      return { ...pre, sessions: [...pre.sessions, data] };
    });
  };

  const fetchUserInput = async (content: string) => {
    const userMessage: ChatMessage = createMessage({
      role: "user",
      content: content,
    });

    const botMessage: ChatMessage = createMessage({
      role: "assistant",
      streaming: true,
    });

    // 保存用户和机器人的消息
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
      },
      // onError(error) {
      //   const isAborted = error.message.includes("aborted");
      //   if (isAborted) return;
      //   botMessage.content = [{ type: "text", context: error.message }];
      //   botMessage.streaming = false;
      //   userMessage.isError = !isAborted;
      //   botMessage.isError = !isAborted;
      //   get().updateCurrentSession((session) => {
      //     session.messages = session.messages.concat();
      //   });
      //   ChatControllerPool.remove(session.id, botMessage.id ?? messageIndex);
      // },
      // onController(controller) {
      //   // collect controller for stop/retry
      //   ChatControllerPool.addController(
      //     session.id,
      //     botMessage.id ?? messageIndex,
      //     controller
      //   );
      // },
    });
  };

  return {
    chatSession,
    setChatSession,
    getCurrentSession,
    getCurrentIndex,
    updateCurrentIndex,
    fetchUserInput,
    addSession,
  };
};
