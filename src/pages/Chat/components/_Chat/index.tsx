import React, { Fragment, useRef } from "react";
import { Icon, useModel } from "@umijs/max";
import Markdown from "@/components/MarkDown";
import { useScroll } from "@/hooks";

import styles from "./index.modules.less";

interface IProps {}

function _Chat(props: IProps) {
  const scrollRef = useRef(null);
  const { getCurrentSession } = useModel("chat");
  const { setAutoScroll, setIsGenerating } = useScroll(scrollRef);
  // const [session, setSession] = useState<ChatSession>();

  // useEffect(() => {
  const session: any = getCurrentSession();
  //   setSession(session);
  // }, []);
  return (
    <>
      <main className={styles._chat_container} ref={scrollRef}>
        <div className={styles._chat_content}>
          {session?.messages.map((message: any) => {
            const isUser = message.role === "user";
            return (
              <Fragment key={message.id}>
                <div
                  className={
                    isUser
                      ? styles["chat-message-user"]
                      : styles["chat-message"]
                  }
                >
                  <div className={styles["chat-message-container"]}>
                    <div className={styles["chat-message-header"]}>
                      <div>{isUser ? null : <Icon icon="local:logo" />}</div>
                      <div
                        className={` ${styles["chat-message-item"]} ${
                          isUser ? styles["chat-message-item-end"] : null
                        } `}
                      >
                        {/*<div className={styles["chat-message-date"]}>*/}
                        {/*  {new Date(message.date).toLocaleString()}*/}
                        {/*</div>*/}
                        {/*显示问题和答案*/}
                        <Markdown
                          loading={message.streaming}
                          content={message.content}
                          // onContextMenu={(e) => onRightClick(e, message)}
                          // onDoubleClickCapture={() => {
                          //   if (!isMobileScreen) return;
                          //   setUserInput(getMessageTextContent(message));
                          // }}
                          fontSize={14}
                          // parentRef={scrollRef}
                          // defaultShow={i >= renderMessages.length - 6}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default _Chat;
