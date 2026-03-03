import { useState, useCallback } from "react";

/**
 * 流式生成周报的自定义Hook
 * 功能：
 * 1. 发起API请求获取AI生成的内容
 * 2. 处理流式响应，实时更新结果
 * 3. 管理加载状态和错误状态
 */
export function useStreamGenerate() {
  const [result, setResult] = useState(""); // 生成的周报内容
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState<string | null>(null); // 错误信息

  /**
   * 生成周报的核心函数
   * @param input 输入的工作内容
   */
  const generate = useCallback(async (input: string) => {
    setLoading(true);
    setResult("");
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!res.body) {
        throw new Error("No response body");
      }

      // 使用ReadableStream读取流式响应
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // 逐块读取并显示内容
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setResult(prev => prev + chunk);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "生成失败，请重试";
      setError(errorMessage);
      setResult(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, generate };
}
