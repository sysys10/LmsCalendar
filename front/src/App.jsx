import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import KakaoRedirect from './pages/auth/KakaoRedirect'
import SignUp from './pages/auth/SignUp'
import MyCalendar from './pages/Calendar'
import Lms from './pages/Lms'
import Navigate from './components/Navigate'
import Lme from './pages/Lme'
import TestCalendar from './pages/TestCalendar'
function App() {
  return (
    <Routes>
      <Route element={<Navigate />}>
        <Route exact path='/' element={<Home />} />
        <Route
          path='/calendar'
          element={
            <>
              <MyCalendar />
              <TestCalendar />
            </>
          }
        />
        <Route path='/lms' element={<Lms />} />
        <Route path='/lme' element={<Lme />} />
      </Route>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/kakao/oauth/redirect' element={<KakaoRedirect />} />
    </Routes>
  )
}

export default App
