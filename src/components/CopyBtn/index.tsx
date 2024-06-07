import React from "react";
import { useCopyClick } from "@/hooks";
import { Icon } from "@umijs/max";

import styles from "./index.modules.less";

interface IProps {
  language: string;
  text: string;
}

function CopyBtn(props: IProps) {
  const { language, text = "" } = props;
  const {
    copied,
    copyLoading,
    onClick: onCopyClick,
  } = useCopyClick({ copyConfig: { text } });
  return (
    <>
      <div
        className={`${styles.surface_secondary} flex items-center relative  w-full  px-4 py-2 text-xs  justify-between`}
      >
        <span>{language}</span>
        <div className="flex items-center">
          <span data-state="closed">
            {copied ? (
              <span className="flex gap-1 items-center">
                <Icon icon="local:right" />
                <span>已复制！</span>
              </span>
            ) : (
              <button
                className=" flex gap-1 items-center"
                onClick={onCopyClick}
              >
                <Icon icon="local:copy" />
                <span>复制代码</span>
              </button>
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default CopyBtn;
