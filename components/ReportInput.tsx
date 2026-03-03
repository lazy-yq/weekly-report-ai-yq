import React from "react";

interface ReportInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

/**
 * 周报输入组件
 * 功能：
 * 1. 提供文本输入区域
 * 2. 显示加载状态
 * 3. 处理生成按钮点击事件
 */
export function ReportInput({ input, onInputChange, onGenerate, loading }: ReportInputProps) {
  // 输入框占位符提示
  const placeholderText = `输入本周完成的任务、解决的问题、参与的项目进展等，例如：
1. 完成项目方案设计并获得客户认可
2. 解决团队协作中的沟通问题
3. 优化工作流程提高效率
4. 完成部门月度目标的80%`;

  return (
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
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
      <button
        onClick={onGenerate}
        className="w-full cursor-pointer bg-blue-600 text-white py-2 sm:py-3 rounded-md flex items-center justify-center text-sm sm:text-base"
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
  );
}
