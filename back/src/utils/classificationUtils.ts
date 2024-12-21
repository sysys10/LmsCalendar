function classifyCategory(input: string) {
  // 분류 기준 정의
  const foodKeywords = ["학생식당", "신소재공학관 식당", "생활과학관 식당"];
  const scheduleKeywords = ["일정"];

  // 조건 체크: food 분류
  if (foodKeywords.some((keyword) => input.includes(keyword))) {
    return "food";
  }

  // 조건 체크: 일정 분류
  if (scheduleKeywords.some((keyword) => input.includes(keyword))) {
    return "schedule";
  }

  // 해당하지 않는 경우
  return "unknown";
}

export default classifyCategory;
