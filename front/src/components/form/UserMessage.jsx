function UserMessage({ message }) {
  return (
    <div className='flex items-center mb-4 md:mb-6'>
      <p className='font-bold text-2xl'>"{message}"</p>
    </div>
  )
}

export default UserMessage
