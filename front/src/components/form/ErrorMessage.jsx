function ErrorMessage() {
  return (
    <div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg'>
      <p className='flex items-center gap-2 font-medium'>
        <span>⚠️</span>
        <span>에러가 발생했습니다. 다시 시도해주세요.</span>
      </p>
    </div>
  );
}

export default ErrorMessage;
