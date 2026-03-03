import OpenAI from "openai";

// deepseek 模型
// const client = new OpenAI({
//   apiKey: process.env.DEEPSEEK_API_KEY,
//   baseURL: "https://api.deepseek.com",
// });

// 智普模型
const client = new OpenAI({
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
});

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const completion = await client.chat.completions.create({
      // model: "deepseek-chat",
      model: "glm-5",
      messages: [
        {
          role: "system",
          content: `你是一名专业的周报撰写专家，能够将任何行业的工作内容描述转化为规范、专业的周报格式。请根据用户提供的工作内容，生成结构清晰、内容详实的周报，包括工作概述、具体成果、遇到的挑战与解决方案等部分。`,
        },
        {
          role: "user",
          content: input,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}