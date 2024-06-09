import React from "react";
import styles from "./index.module.less";

interface IProps {
  data: { icon: string; content: string };
}

function HomeCard(props: IProps) {
  const { data } = props;
  return (
    <div className={`${styles.card_container} px-3 pb-4 pt-3 w-40 gap-2`}>
      <div>{data.icon}</div>
      <div>{data.content}</div>
    </div>
  );
}

export default HomeCard;
