import CustomIcons from '../common/CustomIcons'
import RecommendQuestions from '../form/RecomendQuestions'

function SearchBar({
  search,
  isSearching,
  handleSearch,
  inputRef,
  isFirstSearch,
  searchAnswer
}) {
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    searchAnswer(search)
  }

  const handleRecomendClick = (question) => {
    searchAnswer(question)
  }
  return (
    <div className={`h-28 w-full flex items-center mx-auto`}>
      <div
        className={` flex w-full transition-all duration-700 ease-in-out opacity-100 ${isFirstSearch ? 'flex-col' : 'flex-col-reverse'}
        `}
      >
        <form
          onSubmit={(e) => handleSearchSubmit(e)}
          className={`w-[97%] bg-white mx-auto max-w-3xl flex items-center ${
            isSearching ? 'border-blue-500' : 'border-gray-300'
          } border rounded-[10rem] p-2 my-2`}
        >
          <input
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
            className='w-full bg-transparent pl-4 text-lg rounded-lg h-full outline-none placeholder:text-placeholder placeholder:text-xl'
            ref={inputRef}
            type='text'
            placeholder={'AIHYU에게 무엇이든 질문하세요.'}
          />
          <button
            type='submit'
            className='w-8 h-8 flex items-center justify-center rounded-full bg-background-secondary'
          >
            <CustomIcons name='search' />
          </button>
        </form>
        <RecommendQuestions
          isFirstSearch={isFirstSearch}
          handleRecomendClick={handleRecomendClick}
        />
      </div>
    </div>
  )
}

export default SearchBar
