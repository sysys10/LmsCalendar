import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import KakaoRedirect from "./pages/auth/KakaoRedirect";
import LeftSidebar from "./components/ui/Sidebar";
import NavigationBar from "./components/ui/NavigationBar";
import SignUp from "./pages/auth/SignUp";
import MyCalendar from "./pages/Calendar";

const Navigate = () => {
  return (
    <div className="flex h-[150vh] text-copy-primary bg-background">
      <LeftSidebar />
      <div className="flex-1 flex flex-col">
        {/* 스크롤 가능한 컨테이너를 분리 */}
        <NavigationBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<Navigate />}>
        <Route exact path="/" element={<Home />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/lms" element={<Home />} />
        <Route path="/lme" element={<Home />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/kakao/oauth/redirect" element={<KakaoRedirect />} />
    </Routes>
  );
}

export default App;
