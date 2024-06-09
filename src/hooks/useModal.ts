import { message } from "antd";
import { useState } from "react";

interface Options {
  onOk?: () => Promise<void> | void;
}
export default (options: Options) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  function openModal(modalTitle?: string) {
    setVisible(true);
    if (modalTitle) setTitle(modalTitle);
  }
  function closeModal() {
    setTitle("");
    setVisible(false);
  }
  async function onOk() {
    if (!options.onOk) return;
    setLoading(true);
    try {
      await options.onOk();
      closeModal();
    } catch (error: any) {
      if (error.data === "string") {
        message.error(error.data);
      }
    }
    setLoading(false);
  }

  return {
    modalProps: {
      title,
      visible,
      loading,
      onCancel: closeModal,
      onOk,
      maskClosable: false,
    },
    openModal,
    closeModal,
  };
};
