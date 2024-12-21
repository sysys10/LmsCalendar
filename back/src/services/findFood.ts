interface FoodQuery {
  date: string;
  type: string;
}

export function findFoodMenus(foodDocument: any[], { date, type }: FoodQuery) {
  // 날짜를 ISO 형식으로 변환하고 시간 부분을 표준화
  const queryDate = new Date(date);
  queryDate.setUTCHours(0, 0, 0, 0);
  const queryDateString = queryDate.toISOString();

  // 날짜와 타입이 일치하는 모든 메뉴 찾기
  const result = foodDocument.filter((doc) => {
    const docDate = new Date(doc.date);
    docDate.setUTCHours(0, 0, 0, 0);
    const docDateString = docDate.toISOString();

    return docDateString === queryDateString && doc.type === type;
  });

  console.log("Query Date:", queryDateString);
  console.log("Query Type:", type);
  console.log("Found Results:", result);

  return result;
}
