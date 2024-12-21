function LoadingState() {
  return (
    <div className='flex items-center gap-2 p-4'>
      <div className='animate-bounce w-2 h-2 bg-gray-400 rounded-full'></div>
      <div
        className='animate-bounce w-2 h-2 bg-gray-400 rounded-full'
        style={{ animationDelay: '0.2s' }}
      ></div>
      <div
        className='animate-bounce w-2 h-2 bg-gray-400 rounded-full'
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  );
}

export default LoadingState;
