import React, { useState } from "react";
import { Icon } from "@umijs/max";
import { IconButton } from "@/common";
import { Popover } from "antd";

import styles from "./index.module.less";

interface IProps {}

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

function Sider(props: IProps) {
  const [isSider, setIsSider] = useState<boolean>(false);

  const handleSiderClick = () => {
    setIsSider(true);
  };

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
          <div className={styles.history_item}>
            <a className="block w-full flex justify-between  items-center">
              <span className={styles.history_item_name}>
                123112312312312312321323
              </span>
              <span>
                <Popover
                  arrow={false}
                  trigger="click"
                  placement="rightTop"
                  content={content}
                >
                  <Icon icon="local:edit" />
                </Popover>
              </span>
            </a>
          </div>

          <IconButton text="lisuo" className={styles.sider_user} />
        </div>
      </div>
    </div>
  );
}

export default Sider;
