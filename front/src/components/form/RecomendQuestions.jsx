import CustomChip from '../common/CustopChip'

export default function RecommendQuestions({
  isFirstSearch,
  handleRecomendClick
}) {
  const smapleQuestions = [
    '오늘 학생식당 학식 뭐야?',
    '이번 학기 출격상황 알려줘',
    '오늘 수업 몇시야?',
    '홈즈 몇시까지 해?'
  ]
  return (
    <div
      className={`gap-2 justify-center flex w-full mx-auto overflow-x-auto ${isFirstSearch ? 'flex-wrap' : 'text-nowrap'}`}
    >
      {smapleQuestions.map((question, index) => (
        <CustomChip
          key={index}
          className='text-sm text-secondary hover:text-hover hover:border-hover cursor-pointer rounded-3xl border border-border'
          onClick={() => handleRecomendClick(question)}
        >
          {question}
        </CustomChip>
      ))}
    </div>
  )
}
