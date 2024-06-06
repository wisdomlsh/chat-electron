import { RefObject, useEffect, useState } from "react";

function useScrollToBottom(
  scrollRef: RefObject<HTMLDivElement>,
  detach: boolean = false
) {
  // for auto-scroll

  const [autoScroll, setAutoScroll] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  function scrollDomToBottom() {
    const dom = scrollRef.current;
    if (dom) {
      requestAnimationFrame(() => {
        setAutoScroll(true);
        dom.scrollTo(0, dom.scrollHeight);
      });
    }
  }

  // auto scroll
  useEffect(() => {
    if (autoScroll && !isGenerating) {
      scrollDomToBottom();
    }
  });

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    setIsGenerating,
    scrollDomToBottom,
  };
}

export default useScrollToBottom;
