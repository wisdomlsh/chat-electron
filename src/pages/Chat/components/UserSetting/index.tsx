import React from "react";
import { Button, Popover } from "antd";
import styles from "./index.module.less";

interface IProps {}

function UserSetting(props: IProps) {
  return (
    <>
      <Popover
        arrow={false}
        trigger="click"
        placement="top"
        content={<div>123123</div>}
      >
        <Button type="text" className="flex items-center justify-center gap-2">
          <span className={styles.user_setting}>li</span>
          <span>lishuo</span>
        </Button>
      </Popover>
    </>
  );
}

export default UserSetting;
