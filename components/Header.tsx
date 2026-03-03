import React from "react";

interface HeaderProps {
  bgColor: string;
  onBgColorChange: (color: string) => void;
}

/**
 * 页面头部组件
 * 功能：
 * 1. 显示应用标题和描述
 * 2. 提供背景颜色切换功能
 */
export function Header({ bgColor, onBgColorChange }: HeaderProps) {
  // 背景颜色选项
  const bgColorOptions = [
    { value: "bg-gray-50", label: "默认" },
    { value: "bg-blue-50", label: "蓝色" },
    { value: "bg-green-50", label: "绿色" },
    { value: "bg-yellow-50", label: "黄色" },
  ];

  return (
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
            onClick={() => onBgColorChange(option.value)}
            className={`px-3 py-1 rounded-full cursor-pointer text-xs sm:text-sm ${option.value} border ${bgColor === option.value ? 'border-blue-500' : 'border-gray-300'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
