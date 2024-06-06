import { fetchEventSource } from "@fortaine/fetch-event-source";
import { ChatOptions, LLMApi } from "./type";
import { getHeaders } from "@/utils/chat";

class ChatGPTApi implements LLMApi {
  private disableListModels = true;

  async chat(options: ChatOptions) {
    const controller = new AbortController();
    options.onController?.(controller);

    let remainText: string = "";
    let responseText: string = "";
    let finished = false;

    const chatPayload = {
      method: "POST",
      body: JSON.stringify({ ...options.config, stream: true }),
      signal: controller.signal,
      headers: getHeaders(),
    };

    try {
      // 动画响应，使其看起来平滑
      function animateResponseText() {
        if (finished || controller.signal.aborted) {
          if (responseText?.length === 0) {
            options.onError?.(new Error("empty response from server"));
          }
          return;
        }

        if (remainText.length > 0) {
          const fetchCount = Math.max(1, Math.round(remainText.length / 60));
          const fectText = remainText.slice(0, fetchCount);

          responseText += fectText;
          remainText = remainText.slice(fetchCount);

          options.onUpdate?.(responseText);
        }

        requestAnimationFrame(animateResponseText);
      }

      // start animaion
      animateResponseText();

      const finish = () => {
        if (!finished) {
          finished = true;
          responseText += remainText;
          options.onFinish(responseText);
        }
      };
      controller.signal.onabort = finish;

      fetchEventSource("/api/v1/chat/completions", {
        ...chatPayload,
        async onopen(res) {
          const contentType = res.headers.get("content-type");

          if (contentType?.startsWith("text/plain")) {
            return finish();
          }
        },
        onmessage(msg) {
          if (msg.data === "[DONE]" || finished) {
            return finish();
          }
          const text = msg.data;

          try {
            const json = JSON.parse(text);
            const choices = json.choices as {
              delta: { content: string };
            }[];
            const delta = choices[0]?.delta?.content;

            if (delta) {
              remainText += delta;
            }
          } catch (e) {
            console.error("[Request] parse error", text, msg);
          }
        },
        onclose() {
          finish();
        },
        onerror(e) {
          options.onError?.(e);
          throw e;
        },
        openWhenHidden: true,
      });
    } catch (e) {
      finished = true;
      options.onError?.(e as Error);
    }
  }
}

// export class ClientApi {
//   public llm: LLMApi;
//
//   constructor(provider: ModelProvider = ModelProvider.GPT) {
//     this.llm = new ChatGPTApi();
//   }
// }

export default ChatGPTApi;
