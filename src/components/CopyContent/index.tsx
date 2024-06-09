import React from "react";
import { useCopyClick } from "@/hooks";
import { Icon } from "@umijs/max";

interface IProps {
  language?: string;
  text: string;
  children: React.ReactNode;
  isShowText?: boolean;
  className?: string;
  iconClassName?: string;
}

function CopyContent(props: IProps) {
  const {
    language,
    text = "",
    iconClassName,
    isShowText = true,
    className,
  } = props;
  const {
    copied,
    copyLoading,
    onClick: onCopyClick,
  } = useCopyClick({ copyConfig: { text } });
  return (
    <>
      <div
        className={`${className} flex items-center relative  w-full   text-xs  justify-between`}
      >
        <span>{language}</span>
        <div className="flex items-center">
          <span data-state="closed">
            {copied ? (
              <span className="flex gap-1 items-center">
                <Icon icon="local:right" className={iconClassName} />
                {isShowText ? <span>已复制！</span> : null}
              </span>
            ) : (
              <button
                className=" flex gap-1 items-center"
                onClick={onCopyClick}
              >
                {props.children}
                {isShowText ? <span>复制代码</span> : null}
              </button>
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default CopyContent;
