import {
  MdMenuOpen,
  MdOutlineNotes,
  MdOutlinePerson,
  MdOutlineDelete,
  MdOutlineBookmark,
  MdSearch
} from 'react-icons/md'

const icons = {
  menu: <MdMenuOpen />,
  bookmark: <MdOutlineBookmark />,
  search: <MdSearch />,
  newspaper: <MdOutlineNotes />,
  user: <MdOutlinePerson />,
  trash: <MdOutlineDelete />
}

export default function CustomIcons({
  name,
  isBox = false,
  description,
  className,
  ...props
}) {
  // 기본 아이콘
  const icon = <div>{icons[name]}</div>

  // 툴팁이 필요한 경우
  return (
    <div
      className={`${isBox && 'p-2 bg-white border border-gray-200 rounded-xl'} group relative inline-block ${className}`}
      {...props}
    >
      {icon}
      {description && (
        <div className='absolute left-full ml-2 hidden group-hover:block whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white'>
          {description}
        </div>
      )}
    </div>
  )
}
