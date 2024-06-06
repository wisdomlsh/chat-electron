import React, { useState } from "react";
import { history, Icon, useModel, useParams } from "@umijs/max";
import { Button, Popover } from "antd";

import styles from "./index.module.less";
import UserSetting from "@/pages/Chat/components/UserSetting";

interface IProps {}

function Sider(props: IProps) {
  const params = useParams();
  const { chatSession, updateCurrentIndex } = useModel("chat");
  const [isSider, setIsSider] = useState<boolean>(false);

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

  const handleSiderClick = () => {
    setIsSider(true);
  };

  const handleChangeSessionClick = (id: string, index: number) => {
    history.push(`/chat/${id}`);
    updateCurrentIndex(index);
  };

  // useEffect(() => {
  //
  // }, []);

  return (
    <div
      className={`${styles.sider_container} ${
        isSider ? styles.sider_container_active : ""
      }`}
    >
      <div className="p-3 flex flex-col h-full">
        <div className="h-14 flex items-center cursor-pointer p-2">
          <span onClick={handleSiderClick}>
            <Icon icon="local:sider" className="w-2" />
          </span>
        </div>
        {/*<Button type="text" className="flex items-center my-3.5 p-2 gap-2">*/}
        {/*  <Icon icon="local:chat" />*/}
        {/*  <span>ChatGpt</span>*/}
        {/*</Button>*/}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {chatSession?.sessions?.map((v: any, index: number) => {
              return (
                <div
                  className={`${styles.history_item} ${
                    params.id === v.id && styles.history_item_active
                  }`}
                  key={v.id}
                  onClick={() => handleChangeSessionClick(v.id, index)}
                >
                  <a className="block w-full flex justify-between  items-center">
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
                            params.id === v.id && styles.sider_visible
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

          <UserSetting />
        </div>
      </div>
    </div>
  );
}

export default Sider;
