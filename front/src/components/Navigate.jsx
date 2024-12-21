import { Outlet } from 'react-router-dom'
import LeftSidebar from './ui/Sidebar'
import NavigationBar from './ui/NavigationBar'

const Navigate = () => {
  return (
    <div className='flex min-h-screen text-copy-primary bg-background'>
      <LeftSidebar />
      <div className='flex-1 flex flex-col'>
        <NavigationBar />
        <main className='flex-1 h-full'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Navigate
