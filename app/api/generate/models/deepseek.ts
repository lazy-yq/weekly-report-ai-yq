import OpenAI from "openai";
import { AIModel, ModelConfig, ChatCompletionCreateParams, ChatCompletion, ChatCompletionChunk, Stream } from "./base";

/**
 * DeepSeek模型实现
 */
export class DeepSeekModel implements AIModel {
  private client: OpenAI;
  private modelName: string;

  /**
   * 构造函数
   * @param config 模型配置
   */
  constructor(config: ModelConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
    this.modelName = config.modelName;
  }

  /**
   * 生成聊天完成
   * @param messages 消息数组
   * @param stream 是否启用流式响应
   * @returns 聊天完成结果
   */
  async generate(
    messages: ChatCompletionCreateParams["messages"],
    stream: boolean
  ): Promise<ChatCompletion | Stream<ChatCompletionChunk>> {
    return this.client.chat.completions.create({
      model: this.modelName,
      messages,
      stream,
    });
  }

  /**
   * 获取模型名称
   * @returns 模型名称
   */
  getModelName(): string {
    return this.modelName;
  }
}
