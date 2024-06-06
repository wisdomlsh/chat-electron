import React from "react";
import { Button } from "antd";
import styles from "./index.module.less";

interface IProps {}

function UserSetting(props: IProps) {
  // @ts-ignore
  // const { ipcRenderer } = electron;

  // const handleUserSettingClick = () => {
  //   ipcRenderer.send("show-context-menu");
  // };

  // ipcRenderer.on("context-menu-command", (e, command) => {});

  return (
    <>
      {/*<Popover*/}
      {/*  arrow={false}*/}
      {/*  trigger="click"*/}
      {/*  placement="top"*/}
      {/*  content={*/}
      {/*    <div className={styles.user_content}>*/}
      {/*      <Button type="text">设置</Button>*/}
      {/*      <Button type="text">注销</Button>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*>*/}

      {/*</Popover>*/}
      <Button
        type="text"
        className="flex items-center justify-center gap-2"
        // onClick={handleUserSettingClick}
      >
        <span className={styles.user_setting}>li</span>
        <span>lishuo</span>
      </Button>
    </>
  );
}

export default UserSetting;
