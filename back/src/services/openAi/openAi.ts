import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
interface connectAi {
  text: string;
}
export async function connectAi({ text }: connectAi) {
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
              text: "##Instruction\n입력으로부터 원하는 정보랑 원하는 날짜를 두가지 정보를 추출해줘\n결석 횟수 물어보면 그냥 키워드로 결석만 뱉어.\n\n원하는 정보는 3가지 중에 하나야.\n1. 석식메뉴 2. 조식메뉴 3. 중식메뉴 4.날씨 5. 해당없음\n\n날짜는 상대적으로 입력되더라도 정확한 날짜로 입력해줘 오늘 날짜는 12월 21일이야\n\n장소도 키워드로 잡아줘\n장소는 3가지야.\n1. 신소재공학관 식당 2. 학생식당 3. 생활과학관 식당\n\n일정 여부도 키워드로 일정, 날짜 잡아줘\n\n만약 아래 예시들이랑 하나도 연관성이 없으면 instructions 무시하고 편하게 대화하면 돼\n\n만약에 키워드가 추출이 되었으면 처음에 [1]을 붙여서줘.\n\n##예시1\ninput: 오늘 신소재공학관 식당 석식메뉴 알려줘\noutput: \n[1]\n[신소재공학관 식당]\n[석식메뉴]\n[2024-12-21]\n\n##예시2\ninput: 내일 모레 춥나?\noutput:\n[1]\n[날씨]\n[2024-12-22]\n\n##예시3\ninput: 크리스마스에 여친이랑 뭐먹을지 추천해줘\noutput:\n[1]\n[해당없음]\n[2024-12-25]\n\n##예시4\ninput: 결석 횟수 알려줘\noutput:\n[1]\n[결석]\n\n#예시6\ninput: 내일 일정 알려줘\noutput:\n[1]\n[2024-12-22]\n[일정]",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: text,
            },
          ],
        },
        // {
        //   role: "assistant",
        //   content: [
        //     {
        //       type: "text",
        //       text: "[석식메뉴]  \n[2024-12-21]",
        //     },
        //   ],
        // },
      ],
    });

    const textResponse = response.choices[0].message.content;
    return textResponse;
  } catch (error) {
    console.error("Error:", error);
  }
}
