import { AIModel, ModelType, ModelConfig, ModelConfigMap } from "./base";
import { DeepSeekModel } from "./deepseek";
import { ZhipuModel } from "./zhipu";

/**
 * 模型工厂类
 * 用于创建和管理AI模型实例
 */
export class ModelFactory {
  private static instance: ModelFactory;
  private models: Map<ModelType, AIModel> = new Map();

  /**
   * 私有构造函数
   */
  private constructor() {
    this.initializeModels();
  }

  /**
   * 获取单例实例
   * @returns 模型工厂实例
   */
  public static getInstance(): ModelFactory {
    if (!ModelFactory.instance) {
      ModelFactory.instance = new ModelFactory();
    }
    return ModelFactory.instance;
  }

  /**
   * 初始化模型实例
   */
  private initializeModels() {
    const configs: ModelConfigMap = {
      [ModelType.DEEPSEEK]: {
        apiKey: process.env.DEEPSEEK_API_KEY || "",
        baseURL: "https://api.deepseek.com",
        modelName: "deepseek-chat",
      },
      [ModelType.ZHIPU]: {
        apiKey: process.env.ZHIPU_API_KEY || "",
        baseURL: "https://open.bigmodel.cn/api/paas/v4",
        modelName: "glm-5",
      },
    };

    // 初始化DeepSeek模型
    if (configs[ModelType.DEEPSEEK].apiKey) {
      this.models.set(
        ModelType.DEEPSEEK,
        new DeepSeekModel(configs[ModelType.DEEPSEEK])
      );
    }

    // 初始化智普模型
    if (configs[ModelType.ZHIPU].apiKey) {
      this.models.set(
        ModelType.ZHIPU,
        new ZhipuModel(configs[ModelType.ZHIPU])
      );
    }
  }

  /**
   * 获取模型实例
   * @param modelType 模型类型
   * @returns AI模型实例
   * @throws 当模型未初始化时抛出错误
   */
  public getModel(modelType: ModelType): AIModel {
    const model = this.models.get(modelType);
    if (!model) {
      throw new Error(`Model ${modelType} is not initialized. Please check your API key.`);
    }
    return model;
  }

  /**
   * 获取默认模型实例
   * @returns 默认AI模型实例
   * @throws 当所有模型都未初始化时抛出错误
   */
  public getDefaultModel(): AIModel {
    // 优先使用智普模型，其次使用DeepSeek模型
    // if (this.models.has(ModelType.ZHIPU)) {
    //   return this.getModel(ModelType.ZHIPU);
    // }
    if (this.models.has(ModelType.DEEPSEEK)) {
      return this.getModel(ModelType.DEEPSEEK);
    }
    throw new Error("No AI model is initialized. Please set up your API keys.");
  }

  /**
   * 获取所有可用的模型类型
   * @returns 可用的模型类型数组
   */
  public getAvailableModels(): ModelType[] {
    return Array.from(this.models.keys());
  }
}
