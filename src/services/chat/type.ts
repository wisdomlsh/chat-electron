export const ROLES = ["system", "user", "assistant"] as const;
export type MessageRole = (typeof ROLES)[number];

export const Models = ["gpt-3.5-turbo", "gpt-4"] as const;

export interface MultimodalContent {
  type: "text" | "image_url";
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface RequestMessage {
  role: MessageRole;
  content: string;
  usefulFlag?: boolean | null;
  algorithmSpecMap?: any;
}

export interface Config {
  model?: string;
  messages?: { role: string; content: string }[];
  rounds?: boolean;
  maxToken?: number;
  temperature?: number;
  topP?: number;
}

export interface ChatOptions {
  messages?: RequestMessage[];
  config: Config;
  onUpdate?: (message: string) => void;
  onFinish: (message: string) => void;
  onError?: (err: any) => void;
  onController?: (controller: AbortController) => void;
  context?: string | MultimodalContent[];
}

export interface LLMUsage {
  used: number;
  total: number;
}

export interface LLMModel {
  name: string;
  available: boolean;
  provider: LLMModelProvider;
}

export interface LLMModelProvider {
  id: string;
  providerName: string;
  providerType: string;
}

export abstract class LLMApi {
  abstract chat(options: ChatOptions): Promise<void>;
}

type ProviderName = "openai" | "azure" | "claude" | "palm";

interface Model {
  name: string;
  provider: ProviderName;
  ctxlen: number;
}
