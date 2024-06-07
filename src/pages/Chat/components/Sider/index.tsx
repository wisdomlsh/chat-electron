import React, { useState } from "react";
import { history, Icon, useLocation, useModel } from "@umijs/max";
import { Button, Popover } from "antd";

import styles from "./index.module.less";

interface IProps {}

function Sider(props: IProps) {
  const location = useLocation();
  const { chatSession, updateCurrentIndex } = useModel("chat");
  const [isSider, setIsSider] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("id");
  // @ts-ignore

  const content = (
    <div className="w-full">
      <Button type="text" className="gap-2">
        <Icon icon="local:share" />
        共享
      </Button>
      <Button type="text" className="gap-2">
        <Icon icon="local:rename" />
        重命名
      </Button>
      <Button type="text" className="gap-2">
        <Icon icon="local:delete" />
        删除
      </Button>
    </div>
  );

  const handleSiderClick = (e: { stopPropagation: () => void }) => {
    setIsSider(true);
    e.stopPropagation();
  };

  const handleChangeSessionClick = (id: string, index: number) => {
    history.push(`/chat?id=${id}`);
    updateCurrentIndex(index);
  };

  return (
    <div
      className={`${styles.sider_container} ${
        isSider ? styles.sider_container_active : ""
      }`}
    >
      <div className="p-3 flex flex-col h-full">
        <div className="h-14 flex items-center justify-between  p-2">
          <span onClick={handleSiderClick}>
            <Icon icon="local:sider" className="w-2" />
          </span>
          <span onClick={handleSiderClick}>
            <Icon icon="local:add" className="w-2" />
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
                  onClick={() => handleChangeSessionClick(v.id, index)}
                >
                  <a className=" w-full flex justify-between  items-center">
                    <span className={styles.history_item_name}>{v.topic}</span>
                    <span>
                      <Popover
                        arrow={false}
                        trigger="click"
                        placement="rightTop"
                        content={content}
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
