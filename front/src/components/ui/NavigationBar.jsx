// NavigationBar.jsx
import { Link, useLocation } from "react-router-dom";
import Icons from "../common/Icons";
import { leftSideElements } from "../../constants/sidebarList";
import useDarkMode from "../../hooks/useTheme";
import ToggleTheme, { FancyToggleTheme } from "./ToggleTheme";
import CustomButton from "../common/CustomButton";
import { useState } from "react";
import LoginModal from "../LoginForm";
import useUserStore from "../../stores/userStore";
import Profile from "./Profile";
import { useKakaoLogin } from "../../hooks/useKakaoLogin";

const NavigationBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const clearUser = useUserStore((state) => state.clearUser);
  const handleIconClick = () => {
    setShowLogout((prev) => !prev);
  };

  const user = useUserStore((state) => state.user);

  return (
    <>
      <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      {/* <div className="w-full text-right border-b border-border/50 px-4 h-8">
          상단 탭 필요없으면 슬플듯..
        </div> */}

      {/* 데스크톱 네비게이션 */}
      <nav className="z-20 sticky top-0 bg-card border-b md:flex hidden border-border/50">
        <div className="px-4 sm:px-6 lg:px-8 h-16 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">My App</span>
          </Link>
          <div className="flex gap-4 items-center">
            <ToggleTheme />
            {user ? (
              <div onClick={handleIconClick} className="w-10 h-10">
                <img src={user.thumbnail_image} className="rounded-full" />
              </div>
            ) : (
              <CustomButton
                label="로그인"
                size="md"
                outline={true}
                onClick={() => setModalIsOpen(true)}
              />
            )}
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-card transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div onClick={() => setIsMenuOpen(false)}>
          <Icons name="x" size="40" />
        </div>
        <Profile user={user} />
        <div className="mt-10 px-4">
          {leftSideElements.map((item) => (
            <Link
              key={item.name}
              onClick={() => setIsMenuOpen(false)}
              to={item.to}
              className={`flex items-center gap-4 py-4 border-b border-border/50
                  ${
                    location.pathname === item.to
                      ? "text-primary"
                      : "text-copy-secondary hover:text-copy-primary"
                  }`}
            >
              <Icons name={item.name} size="20" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {showLogout && (
        <>
          <div
            className="fixed inset-0 z-10 md:flex hidden"
            onClick={() => setShowLogout(false)}
          />
          <div className="absolute mb-2 right-0 top-12 z-20 w-28 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border/50 overflow-hidden">
            <button
              className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              onClick={() => {
                // 로그아웃 로직
                clearUser();
                setShowLogout(false);
                window.location.reload();
              }}
            >
              로그아웃
            </button>
          </div>
        </>
      )}

      {/* 모바일 상단 헤더 */}
      <div className="md:hidden sticky top-0 z-20 bg-card border-b border-border/50">
        <div className="h-14 flex items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold">My App</span>
          </Link>
          <div className="flex items-center">
            {user ? (
              <div
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="w-10 h-10"
              >
                <img src={user.thumbnail_image} className="rounded-full" />
              </div>
            ) : (
              <CustomButton
                label="로그인"
                size="sm"
                outline={true}
                onClick={() => setModalIsOpen(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
