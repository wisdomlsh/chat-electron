import React, { Fragment, useEffect, useRef, useState } from "react";
import { Icon, useLocation, useModel } from "@umijs/max";
import Markdown from "@/components/MarkDown";
import { useScroll } from "@/hooks";
import EmptyMessageShow from "@/pages/Chat/components/EmptyMessageShow";
import { Button } from "antd";
import CopyContent from "@/components/CopyContent";

import styles from "./index.modules.less";
import { getQuerySearch } from "@/utils/chat";
import { ChatSession } from "@/models/chat";
import { fetchGeoLocation } from "@/services/geolocation";

interface IProps {}

function _Chat(props: IProps) {
  const scrollRef = useRef(null);
  const location = useLocation();
  const {
    getCurrentSession,
    stopAllSteaming,
    fetchUserInput,
    chatSession,
    updateCurrentSession,
  } = useModel("chat");
  const { app, setApp } = useModel("app");
  const { setAutoScroll, setIsGenerating } = useScroll(scrollRef);
  const [sessionData, setSessionData] = useState<ChatSession>();
  const [voicePending, setVoicePending] = useState<boolean>(false);

  const handleVoiceClick = (content: string) => {
    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => {
      return voice.lang === "zh-TW";
    });
    const speech = new SpeechSynthesisUtterance();

    speech.onend = () => {
      setVoicePending(speechSynthesis.speaking);
    };
    speech.text = content;
    speech.voice = selectedVoice || null;
    speechSynthesis.speak(speech);
    setVoicePending(speechSynthesis.speaking);
  };

  const handleStopVoiceClick = (e: React.SyntheticEvent) => {
    speechSynthesis.cancel();
    setVoicePending(speechSynthesis.speaking);
    e.stopPropagation();
  };

  const deleteMessage = (msgId?: string) => {
    updateCurrentSession(
      (session) =>
        (session.messages = session.messages.filter((m) => m.id !== msgId))
    );
  };

  const handleReloadClick = () => {
    const session = getCurrentSession(chatSession.currentSessionId);

    const preMsgId = session!.messages.at(-1)!.id;
    const preContent = session!.messages.at(-2)!.content;
    deleteMessage(preMsgId);
    deleteMessage(session!.messages.at(-1)!.id);
    fetchUserInput(preContent);
  };

  const acquiringCountry = () => {
    const successCallback = async (position: {
      coords: { latitude: any; longitude: any };
    }) => {
      const { latitude, longitude } = position.coords;
      const { regeocode } = await fetchGeoLocation({
        location: `${longitude},${latitude}`,
      });

      setApp({ country: regeocode.addressComponent.country });
    };

    const errorCallback = (error: { code: any; message: any }) => {
      console.error(`Error Code = ${error.code} - ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  useEffect(() => {
    stopAllSteaming();
    const session: any = getCurrentSession(getQuerySearch(location.search));
    setSessionData(session);
  }, [location.search]);

  useEffect(() => {
    acquiringCountry();
  }, []);

  return (
    <>
      <main className={styles._chat_container} ref={scrollRef}>
        <div className={styles._chat_content}>
          {sessionData?.messages.length ? null : (
            <div className="w-full h-full flex flex-col justify-center gap-6 items-center">
              <EmptyMessageShow />
            </div>
          )}
          {sessionData?.messages.map((message, index) => {
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
                          loading={
                            message.streaming &&
                            message.content.length === 0 &&
                            !isUser
                          }
                          content={message.content}
                          fontSize={14}
                        />
                        {voicePending}
                        {!isUser && !message.streaming ? (
                          <div
                            className={`${
                              sessionData.messages.length - 1 === index
                                ? styles._chat_footer_active
                                : null
                            } ${styles._chat_footer}  mt-2 flex gap-3 -ml-2`}
                          >
                            <div className="items-center justify-start rounded-xl p-1 flex">
                              <div className="flex items-center">
                                <Button
                                  type="text"
                                  className="p-1"
                                  onClick={() =>
                                    handleVoiceClick(message.content)
                                  }
                                >
                                  {voicePending ? (
                                    <Icon
                                      icon="local:stop"
                                      width="18"
                                      height="18"
                                      className="text-[#7d7d7d]"
                                      onClick={handleStopVoiceClick}
                                    />
                                  ) : (
                                    <Icon icon="local:voice" />
                                  )}
                                </Button>
                                <Button type="text" className="p-1">
                                  <CopyContent
                                    text={message.content}
                                    isShowText={false}
                                    iconClassName="text-[#7d7d7d]"
                                  >
                                    <Icon icon="local:copyMessage" />
                                  </CopyContent>
                                </Button>
                                {sessionData.messages.length - 1 === index && (
                                  <Button
                                    type="text"
                                    className="p-1"
                                    onClick={handleReloadClick}
                                  >
                                    <Icon icon="local:reload" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}
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
