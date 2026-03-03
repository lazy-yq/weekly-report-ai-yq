"use client";

import { useState, useEffect, useRef } from "react";

/**
 * AI周报助手主页面组件
 * 功能：
 * 1. 输入工作内容，生成专业的技术周报
 * 2. 实时显示生成过程
 * 3. 支持背景颜色切换
 * 4. 响应式设计，适配不同屏幕尺寸
 */
export default function Home() {
  // 状态管理
  const [input, setInput] = useState(""); // 输入的工作内容
  const [result, setResult] = useState(""); // 生成的周报内容
  const [loading, setLoading] = useState(false); // 加载状态
  const [bgColor, setBgColor] = useState("bg-gray-50"); // 背景颜色
  const resultContainerRef = useRef<HTMLDivElement>(null); // 结果容器引用，用于自动滚动

  // 输入框占位符提示
  const placeholderText = `输入本周完成的任务、解决的问题、参与的项目进展等，例如：
1. 完成项目方案设计并获得客户认可
2. 解决团队协作中的沟通问题
3. 优化工作流程提高效率
4. 完成部门月度目标的80%`;

  /**
   * 生成周报的核心函数
   * 使用流式请求获取AI生成的内容
   */
  const generate = async () => {
    setLoading(true);
    setResult("");

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
    } catch (error) {
      console.error("Error generating report:", error);
      setResult("生成失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 复制生成的周报内容到剪贴板
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  /**
   * 当生成内容更新时，自动滚动到容器底部
   */
  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
    }
  }, [result]);

  // 背景颜色选项
  const bgColorOptions = [
    { value: "bg-gray-50", label: "默认" },
    { value: "bg-blue-50", label: "蓝色" },
    { value: "bg-green-50", label: "绿色" },
    { value: "bg-yellow-50", label: "黄色" },
  ];

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-2">
            AI周报助手
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            输入本周工作内容，一键生成规范、专业的周报
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {bgColorOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setBgColor(option.value)}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm ${option.value} border ${bgColor === option.value ? 'border-blue-500' : 'border-gray-300'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3 sm:mb-4">
              <svg className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h2 className="text-base sm:text-lg font-semibold">输入工作内容</h2>
            </div>
            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">本周工作要点</p>
              <textarea
                className="w-full h-48 sm:h-56 md:h-64 border border-gray-200 p-3 sm:p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                placeholder={placeholderText}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              onClick={generate}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md flex items-center justify-center text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-3 sm:h-4 w-3 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  生成中...
                </>
              ) : (
                <>
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  生成周报
                </>
              )}
            </button>
          </div>

          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-base sm:text-lg font-semibold">生成的周报内容</h2>
              </div>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 text-xs sm:text-sm flex items-center cursor-pointer"
                disabled={!result}
              >
                <svg className="w-3 sm:w-4 h-3 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                复制内容
              </button>
            </div>
            <div ref={resultContainerRef} className="border border-gray-200 rounded-md p-3 sm:p-4 h-[300px] sm:h-[350px] md:h-[400px] overflow-y-auto">
              {result ? (
                <pre className="whitespace-pre-wrap text-gray-800 text-sm">{result}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-8 sm:w-10 md:w-12 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-xs sm:text-sm">点击「生成周报」按钮，AI将为你生成专业的周报内容</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}