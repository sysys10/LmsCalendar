import { AiOutlineUser } from 'react-icons/ai'
import ThirdIcon from '../../../assets/ThirdIcon.png'
const timeUtils = {
  getCurrentTime: () => {
    return new Date().toLocaleString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
function AIResponseHeader() {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-end gap-3'>
        <div className='rounded-full flex items-center justify-center'>
          <img src={ThirdIcon} className='w-8 h-8' />
        </div>
        <p className='text-tertiary font-normal text-md'>
          {timeUtils.getCurrentTime()}
        </p>
      </div>
    </div>
  )
}

export default AIResponseHeader
