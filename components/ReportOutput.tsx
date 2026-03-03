import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface ReportOutputProps {
  result: string;
  onCopy: () => void;
}

/**
 * 周报输出组件
 * 功能：
 * 1. 显示生成的周报内容
 * 2. 支持Markdown渲染
 * 3. 提供复制功能
 * 4. 自动滚动到最新内容
 */
export function ReportOutput({ result, onCopy }: ReportOutputProps) {
  const resultContainerRef = useRef<HTMLDivElement>(null); // 结果容器引用，用于自动滚动

  /**
   * 当生成内容更新时，自动滚动到容器底部
   */
  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
    }
  }, [result]);

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center">
          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-base sm:text-lg font-semibold">生成的周报内容</h2>
        </div>
        <button
          onClick={onCopy}
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
          <div className="prose prose-sm sm:prose max-w-none">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
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
  );
}
