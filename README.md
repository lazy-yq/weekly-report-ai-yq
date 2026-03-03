# AI周报助手 / AI Weekly Report Assistant

## 项目简介 / Project Introduction

AI周报助手是一个基于Next.js和AI技术的工具，帮助程序员快速生成专业、规范的技术周报。通过输入本周工作内容，AI将自动分析并生成结构化的周报内容，节省您的时间和精力。

AI Weekly Report Assistant is a tool based on Next.js and AI technology that helps programmers quickly generate professional and standardized technical weekly reports. By inputting your weekly work content, AI will automatically analyze and generate structured report content, saving your time and effort.

## 功能特点 / Features

- 📝 **智能生成**：使用AI技术分析输入内容，生成专业的周报
- ⚡ **实时输出**：采用流式输出，实时显示生成过程
- 🎨 **背景切换**：支持多种背景颜色切换，个性化使用体验
- 📱 **响应式设计**：适配移动端、平板和桌面端
- 📋 **一键复制**：方便快速复制生成的周报内容
- 🎯 **专业结构**：生成结构清晰、格式规范的技术周报

## 技术栈 / Tech Stack

- **前端**：Next.js 14+, React, Tailwind CSS
- **后端**：Next.js API Routes
- **AI服务**：DeepSeek API
- **构建工具**：TypeScript, Next.js build system

## 安装和运行 / Installation and Running

### 前置要求 / Prerequisites

- Node.js 18.0+
- npm, yarn, pnpm or bun
- DeepSeek API Key

### 安装步骤 / Installation Steps

1. 克隆项目 / Clone the project
```bash
git clone <repository-url>
cd weekly-report-ai-yq
```

2. 安装依赖 / Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. 配置环境变量 / Configure environment variables

创建 `.env.local` 文件并添加以下内容：
Create a `.env.local` file and add the following content:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key
```

4. 启动开发服务器 / Start development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. 访问应用 / Access the application

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

Open your browser and visit [http://localhost:3000](http://localhost:3000)

## 使用说明 / Usage

1. 在左侧输入框中粘贴或输入本周工作内容
2. 点击「生成周报」按钮
3. 右侧会实时显示AI生成的周报内容
4. 点击「复制内容」按钮可以将生成的周报复制到剪贴板
5. 可以通过顶部的颜色选项切换背景颜色

## 项目结构 / Project Structure

```
weekly-report-ai-yq/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts     # 生成周报的API接口
│   ├── page.tsx            # 主页面组件
│   ├── globals.css         # 全局样式
│   └── layout.tsx          # 页面布局
├── public/                 # 静态资源
├── .env.local              # 环境变量配置
├── package.json            # 项目配置
└── README.md               # 项目说明
```

## 配置说明 / Configuration

- **DEEPSEEK_API_KEY**：DeepSeek API密钥，用于调用AI模型生成周报

## 部署 / Deployment

### Vercel部署 / Deploy on Vercel

1. 登录 Vercel 账号
2. 导入项目仓库
3. 在环境变量设置中添加 `DEEPSEEK_API_KEY`
4. 点击部署按钮

### 其他部署方式 / Other Deployment Methods

可以使用任何支持Next.js的托管服务，如Netlify、AWS Amplify等。

## 贡献 / Contribution

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证 / License

MIT

## 联系方式 / Contact

如有问题或建议，欢迎联系项目维护者。
