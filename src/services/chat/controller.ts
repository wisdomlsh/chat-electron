// To store message streaming controller
const ChatControllerPool = {
  controllers: {} as Record<string, AbortController>,

  addController(
    sessionId: number,
    messageId: number,
    controller: AbortController
  ) {
    const key = this.key(sessionId, messageId);
    this.controllers[key] = controller;
    return key;
  },

  stop(sessionId: number, messageId: number) {
    const key = this.key(sessionId, messageId);
    const controller = this.controllers[key];
    controller?.abort();
  },

  stopAll() {
    Object.values(this.controllers).forEach((v) => v.abort());
  },

  hasPending() {
    return Object.values(this.controllers).length > 0;
  },

  remove(sessionId: number, messageId: number) {
    const key = this.key(sessionId, messageId);
    delete this.controllers[key];
  },

  key(sessionId: number, messageIndex: number) {
    return `${sessionId},${messageIndex}`;
  },
};

export default ChatControllerPool;
