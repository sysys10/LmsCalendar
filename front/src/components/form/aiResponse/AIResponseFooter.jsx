import { AiOutlineLike, AiOutlineAlert, AiOutlineDislike } from 'react-icons/ai'
import CustomChip from '../../common/CustopChip'
function AIResponseFooter() {
  return (
    <div className='flex justify-between mt-4'>
      <CustomChip size='md'>
        <div className='w-4 h-4 rounded-full'>
          <AiOutlineAlert className='text-red-500' />
        </div>
        <p>답변신고</p>
      </CustomChip>
      <CustomChip size='md'>
        <AiOutlineLike className='hover:bg-blue-500 text-blue-500' />
        <AiOutlineDislike className='hover:bg-red-500 text-red-500' />
      </CustomChip>
    </div>
  )
}

export default AIResponseFooter
