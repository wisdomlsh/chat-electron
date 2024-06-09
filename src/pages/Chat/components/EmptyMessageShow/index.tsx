import React from "react";
import { Icon } from "@umijs/max";

import { HomeCard } from "@/common";

interface IProps {}

const context = [
  {
    id: "1",
    icon: "😀",
    content: "客服困难",
  },
  {
    id: "2",
    icon: "😀",
    content: "客服困难",
  },
  {
    id: "3",
    icon: "😀",
    content: "客服困难",
  },
  {
    id: "4",
    icon: "😀",
    content: "客服困难",
  },
];

function EmptyMessageShow(props: IProps) {
  return (
    <>
      <Icon icon="local:logo" />
      <div className="flex gap-2 flex-wrap justify-center">
        {context.map((v) => {
          return <HomeCard key={v.id} data={v} />;
        })}
      </div>
    </>
  );
}

export default EmptyMessageShow;
