import React, { Fragment } from "react";
import { Icon, useModel } from "@umijs/max";
import Markdown from "@/components/MarkDown";

import styles from "./index.modules.less";

interface IProps {}

function _Chat(props: IProps) {
  const { chatSession, getCurrentSession } = useModel("chat");
  const session = getCurrentSession();
  return (
    <>
      <main className={styles._chat_container}>
        {session.messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <Fragment key={message.id}>
              <div
                className={
                  isUser ? styles["chat-message-user"] : styles["chat-message"]
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
                        content={message.content}
                        // onContextMenu={(e) => onRightClick(e, message)}
                        // onDoubleClickCapture={() => {
                        //   if (!isMobileScreen) return;
                        //   setUserInput(getMessageTextContent(message));
                        // }}
                        fontSize={16}
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
      </main>
    </>
  );
}

export default _Chat;
