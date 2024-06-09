import React, { useEffect, useState } from "react";
import { history, Icon, useLocation, useModel } from "@umijs/max";
import { Button, Popover } from "antd";

import styles from "./index.module.less";
import { getQuerySearch } from "@/utils/chat";

interface IProps {}

function Sider(props: IProps) {
  const location = useLocation();
  const { chatSession, updateCurrentId, addSession, deleteSession } =
    useModel("chat");
  const [isSider, setIsSider] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>("");

  const handleSiderClick = (e: { stopPropagation: () => void }) => {
    setIsSider(true);
    e.stopPropagation();
  };

  const handleChangeSessionClick = (id: string, index: number) => {
    history.replace(`/chat?id=${id}`);
    updateCurrentId(id);
  };

  const handleAddSessionClick = () => {
    addSession();
    const data = chatSession.sessions.at(0)?.id;
    history.replace(`/chat?id=${data}`);
  };

  const handleDeleteClick = (id: string) => {
    deleteSession(id);
    const data = chatSession.sessions.at(-1)?.id;
    history.replace(`/chat?id=${data}`);
  };

  useEffect(() => {
    setSessionId(getQuerySearch(location.search));
  }, [location.search]);

  return (
    <div
      className={`${styles.sider_container} ${
        isSider ? styles.sider_container_active : ""
      }`}
    >
      <div className="p-3 flex flex-col h-full">
        <div className="h-14 flex items-center justify-between  p-2">
          <span onClick={handleSiderClick}>
            <Icon icon="local:sider" className="w-2 cursor-pointer" />
          </span>
          <span onClick={handleAddSessionClick}>
            <Icon icon="local:add" className="w-2 cursor-pointer" />
          </span>
        </div>
        <div className="mb-3 p-0">
          <Button type="text" className={styles.sider_explore_btn}>
            <Icon icon="local:explore" />
            探索ChatGpt
          </Button>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {chatSession?.sessions?.map((v: any, index: number) => {
              return (
                <div
                  className={`${styles.history_item} ${
                    sessionId === v.id && styles.history_item_active
                  }`}
                  key={v.id}
                >
                  <a className="w-full flex justify-between  items-center cursor-pointer">
                    <span
                      className={styles.history_item_name}
                      onClick={() => handleChangeSessionClick(v.id, index)}
                    >
                      {v.topic}
                    </span>
                    <span>
                      <Popover
                        arrow={false}
                        trigger="click"
                        placement="rightTop"
                        content={
                          <div className="w-full">
                            <Button type="text" className="gap-2 p-2">
                              <Icon icon="local:share" />
                              共享
                            </Button>
                            <Button type="text" className="gap-2 p-2">
                              <Icon icon="local:rename" />
                              重命名
                            </Button>
                            <Button
                              type="text"
                              className={`${styles.delete} gap-2 p-2 text-[#f93a37]`}
                              onClick={() => handleDeleteClick(v.id)}
                            >
                              <Icon icon="local:delete" />
                              删除
                            </Button>
                          </div>
                        }
                      >
                        <span
                          className={`${styles.sider_edit} ${
                            sessionId === v.id && styles.sider_visible
                          }`}
                        >
                          <Icon icon="local:edit" />
                        </span>
                      </Popover>
                    </span>
                  </a>
                </div>
              );
            })}
          </div>

          {/*<UserSetting />*/}
        </div>
      </div>
    </div>
  );
}

export default Sider;
