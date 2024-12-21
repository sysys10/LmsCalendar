import { Request, Response } from "express";
import { connectAi } from "../services/openAi/openAi";
import classifyCategory from "../utils/classificationUtils";
import { findFoodMenus } from "../services/findFood";
import { connectAnser } from "../services/openAi/answer";

const foddDocument = [
  {
    location: "학생식당",
    date: "2024-12-21T00:00:00Z",
    type: "중식",
    food: "[한식] 치킨치즈까스",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-21T00:00:00Z",
    type: "중식",
    food: "치즈순살돈가스 잔치국수 추가밥 단무지무침 포기김치 요구르트",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-21T00:00:00Z",
    type: "중식",
    food: "돈육김치찌개 백미밥 탕수육 명엽채볶음 콩자반 열무김치",
  },
  {
    location: "학생식당",
    date: "2024-12-23T00:00:00Z",
    type: "중식",
    food: "[양식] 치킨치즈까스, [한식] 소고기야채비빔밥, [즉석] 부대찌개&라면사리",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-23T00:00:00Z",
    type: "중식",
    food: "(뚝)만두순두부찌개 후르츠탕수육 버섯잡채 콩나물무침 포기김치 흑미밥, 카레돈가스덮밥 온메밀국수 고구마고로케*케찹 단무지 요구르트 깍두기",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-23T00:00:00Z",
    type: "중식",
    food: "[정식] 뼈없는 감자탕 잡곡밥 야채춘권 느타리맛살볶음 건파래볶음 배추김치, [일품] 돈까스카레덮밥 국물떡볶이 미소된장국 푸실리샐러드 포도주스 배추김치",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-23T00:00:00Z",
    type: "석식",
    food: "스팸짜글이 백미밥 감자국 물파래옥수수전 꽈리꼬추멸치볶음 깍두기",
  },
  {
    location: "학생식당",
    date: "2024-12-24T00:00:00Z",
    type: "중식",
    food: "[양식] 치킨까스, [한식] 돼지고기마늘쫑덮밥, [즉석] 짜장불고기",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-24T00:00:00Z",
    type: "중식",
    food: "(뚝)돈육갈비찜 시래기된장국 분홍소세지전*케찹 마늘쫑장아찌 깍두기 보리밥, 돈코츠라멘 햄김치주먹밥&김가루 만두튀김 단무지무침 요구르트 포기김치",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-24T00:00:00Z",
    type: "중식",
    food: "[정식] 콩나물불고기 잡곡밥 북어국 해물까스 맛살마늘쫑볶음 배추김치, [일품] 함박덮밥 미니우동 치킨볼강정 마카로니샐러드 오복지무침 배추김치",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-24T00:00:00Z",
    type: "석식",
    food: "데리야끼닭살덮밥 유부김치국 깐풍기 도토리묵*양념장 요구르트 석박지",
  },
  {
    location: "학생식당",
    date: "2024-12-25T00:00:00Z",
    type: "중식",
    food: "[양식] 치즈돈까스, [한식] 소불고기비빔밥, [즉석] 이북식닭곰탕",
  },
  {
    location: "학생식당",
    date: "2024-12-26T00:00:00Z",
    type: "중식",
    food: "[양식] 치킨치즈까스, [한식] 돈육강된장덮밥, [즉석] 매콤돈갈비찜",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-26T00:00:00Z",
    type: "중식",
    food: "(뚝)우렁된장찌개 매콤제육볶음*파채 연근조림 미나리숙주나물 포기김치 현미밥, 오므라이스&왕새우튀김 김치우동 김말이튀김 단무지무침 새우칩 포기김치",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-26T00:00:00Z",
    type: "석식",
    food: "(철판)치즈떡갈비스테이크 시금치된장국 매콤떡볶이 오이지무침 포기김치 쌀밥",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-26T00:00:00Z",
    type: "중식",
    food: "[정식] 닭곰탕*소면사리 잡곡밥 산적바베큐조림 햄피망볶음 부추무침 석박지, [일품] 새우볶음밥 미니짬뽕 해쉬브라운*케찹 멕시칸샐러드 무말랭이무침 배추김치",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-26T00:00:00Z",
    type: "석식",
    food: "돈육된장찌개 백미밥 계란찜 팽이미역줄기볶음 매콤어묵볶음 배추김치",
  },
  {
    location: "학생식당",
    date: "2024-12-27T00:00:00Z",
    type: "중식",
    food: "[양식] 오징어까스, [한식] 나물비빔밥, [즉석] 들깨감자칼국수",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-27T00:00:00Z",
    type: "중식",
    food: "(뚝)육개장칼국수 떡갈비야채볶음 파래김 부추겉절이 깍두기 수수밥, 불맛닭고기덮밥*눈꽃치즈 교자칼국수 콘샐러드 단무지무침 새우칩 포기김치",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-27T00:00:00Z",
    type: "석식",
    food: "언양식바싹불고기*파채 (뚝)된장찌개 청포묵야채무침 무말랭이건고춧잎무침 포기김치 쌀밥",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-27T00:00:00Z",
    type: "중식",
    food: "돈육김치찌개 백미밥 탕수육 명엽채볶음 콩자반 열무김치",
  },
  {
    location: "학생식당",
    date: "2024-12-28T00:00:00Z",
    type: "중식",
    food: "[양식] 등심돈까스",
  },
  {
    location: "생활과학관 식당",
    date: "2024-12-28T00:00:00Z",
    type: "중식",
    food: "뚝배기설렁탕*소면 두부양념조림 사각어묵볶음 고추양파절임 깍두기 쌀밥",
  },
  {
    location: "신소재공학관 식당",
    date: "2024-12-28T00:00:00Z",
    type: "중식",
    food: "고추장제육덮밥 미역국 떡갈비구이 쥐어채볶음 건파래볶음",
  },
];
async function process(req: Request, res: Response) {
  try {
    const { text } = req.body;

    let result = await connectAi({ text });
    console.log(result);

    if (result && result.includes("[1]")) {
      const classification = classifyCategory(result as string);

      const lines = result.split("\n").filter((line) => line.trim());
      if (classification === "food") {
        console.log(lines);
        console.log(classification);
        const location = lines[1].replace(/[\[\]]/g, "").trim();
        const type = lines[2].replace(/[\[\]]/g, "").trim();
        const dateStr = lines[3].replace(/[\[\]]/g, "").trim();
        const queryType = type.startsWith("중식")
          ? "중식"
          : type.startsWith("석식")
            ? "석식"
            : "중식";
        console.log(queryType, dateStr);

        const menus = findFoodMenus(foddDocument, {
          date: dateStr,
          type: queryType,
        });
        console.log(menus);
        const answer = await connectAnser({ text: JSON.stringify(menus) });
        res.json(answer);
        return;
      }
    }

    res.json(result);
    return;
  } catch (error) {
    console.error("Process error:", error);
    res.status(500);
  }
}

export { process };
