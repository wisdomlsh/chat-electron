import React, { useEffect, useState } from "react";
import { Icon } from "@umijs/max";
import { IconButton } from "@/common";
import { Button, Popover } from "antd";

import styles from "./index.module.less";

interface IProps {}

function Sider(props: IProps) {
  const [isSider, setIsSider] = useState<boolean>(false);
  const [siderData, setSiderData] = useState<any>([]);
  const [id, setId] = useState<any>(1);

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

  useEffect(() => {
    setSiderData([
      {
        sessionName: "新的聊天",
        sessionId: 1,
      },
      {
        sessionName: "新的聊天",
        sessionId: 2,
      },
    ]);

    setId(1);
  }, []);

  return (
    <div
      className={`${styles.sider_container} ${
        isSider ? styles.sider_container_active : ""
      }`}
    >
      <div className="p-3 flex flex-col h-full">
        <div className="h-14 flex items-center cursor-pointer">
          <span onClick={handleSiderClick}>
            <Icon icon="local:sider" />
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {siderData.map((v: any) => {
              return (
                <div
                  className={`${styles.history_item} ${
                    id === v.sessionId && styles.history_item_active
                  }`}
                  key={v.sessionId}
                >
                  <a className="block w-full flex justify-between  items-center">
                    <span className={styles.history_item_name}>
                      {v.sessionName}
                    </span>
                    <span>
                      <Popover
                        arrow={false}
                        trigger="click"
                        placement="rightTop"
                        content={content}
                      >
                        <span className={styles.sider_edit}>
                          <Icon icon="local:edit" />
                        </span>
                      </Popover>
                    </span>
                  </a>
                </div>
              );
            })}
          </div>

          <IconButton text="lisuo" className={styles.sider_user} />
        </div>
      </div>
    </div>
  );
}

export default Sider;
