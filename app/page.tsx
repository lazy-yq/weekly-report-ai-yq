"use client";

import { useState } from "react";
import { useStreamGenerate } from "../hooks/useStreamGenerate";
import { Header } from "../components/Header";
import { ReportInput } from "../components/ReportInput";
import { ReportOutput } from "../components/ReportOutput";

/**
 * AI周报助手主页面组件
 * 功能：
 * 1. 组织和协调各个子组件
 * 2. 管理输入状态和背景颜色状态
 * 3. 处理生成和复制操作
 */
export default function Home() {
  // 状态管理
  const [input, setInput] = useState(""); // 输入的工作内容
  const [bgColor, setBgColor] = useState("bg-gray-50"); // 背景颜色
  const { result, loading, generate } = useStreamGenerate(); // 使用自定义Hook

  /**
   * 处理生成按钮点击事件
   */
  const handleGenerate = () => {
    if (input.trim()) {
      generate(input);
    }
  };

  /**
   * 复制生成的周报内容到剪贴板
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
        <Header bgColor={bgColor} onBgColorChange={setBgColor} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <ReportInput
            input={input}
            onInputChange={setInput}
            onGenerate={handleGenerate}
            loading={loading}
          />
          <ReportOutput result={result} onCopy={copyToClipboard} />
        </div>
      </div>
    </div>
  );
}