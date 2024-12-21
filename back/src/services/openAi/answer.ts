import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function connectAnser({ text }: { text: string }) {
  openai.apiKey = process.env.OPENAI_API_KEY || "ㅇㅇ";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: `##Instruction\n참고 데이터를 참고해서 유저 쿼리에 대한 올바른 답변을 해줘.\n\n##참고 데이터\n${JSON.stringify(text)}`,
            },
          ],
        },
      ],
    });

    const textResponse = response.choices[0].message.content;
    console.log(textResponse);

    return textResponse;
  } catch (error) {
    console.error("Error:", error);
  }
}
