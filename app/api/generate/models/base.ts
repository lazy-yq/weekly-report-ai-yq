import { ChatCompletionCreateParams, ChatCompletion } from "openai/resources/chat/completions";
import type { Stream } from "openai/streaming";
import type { ChatCompletionChunk } from "openai/resources/chat/completions";

export type { ChatCompletionCreateParams, ChatCompletion, ChatCompletionChunk, Stream };

/**
 * AI模型接口
 * 所有AI模型实现都需要遵循此接口
 */
export interface AIModel {
  /**
   * 生成聊天完成
   * @param messages 消息数组
   * @param stream 是否启用流式响应
   * @returns 聊天完成结果
   */
  generate(messages: ChatCompletionCreateParams["messages"], stream: boolean): Promise<ChatCompletion | Stream<ChatCompletionChunk>>;
  
  /**
   * 获取模型名称
   * @returns 模型名称
   */
  getModelName(): string;
}

/**
 * 模型配置接口
 */
export interface ModelConfig {
  apiKey: string;
  baseURL: string;
  modelName: string;
}

/**
 * 模型类型枚举
 */
export enum ModelType {
  DEEPSEEK = "deepseek",
  ZHIPU = "zhipu",
  OPENAI = "openai",
}

/**
 * 模型配置映射
 */
export interface ModelConfigMap {
  [ModelType.DEEPSEEK]: ModelConfig;
  [ModelType.ZHIPU]: ModelConfig;
  [ModelType.OPENAI]?: ModelConfig;
}
