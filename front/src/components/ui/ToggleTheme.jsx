import useDarkMode from "../../hooks/useTheme";
import Icons from "../common/Icons";

const ToggleTheme = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-16 h-8 rounded-full shadow-lg bg-white relative`}
    >
      <div
        className={`w-8 h-8 rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center text-white
          ${isDark ? "translate-x-8 bg-gray-600" : "translate-x-0 bg-yellow-500"}
        `}
      >
        {isDark ? <Icons name="moon" /> : <Icons name="sun" />}
      </div>
    </button>
  );
};

export default ToggleTheme;

// 트랜지션 되는 더 화려한 버전
const FancyToggleTheme = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative w-20 h-10 rounded-full p-1
        transition-colors duration-300 ease-in-out
        ${isDark ? "bg-gray-700" : "bg-blue-100"}
        overflow-hidden
      `}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {/* 배경 이펙트 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`
          w-16 h-16 rounded-full
          transition-opacity duration-300
          ${isDark ? "opacity-20" : "opacity-0"}
          bg-yellow-300
        `}
        />
      </div>

      {/* 슬라이딩 써클 */}
      <div
        className={`
          absolute top-1 w-8 h-8 rounded-full 
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          ${
            isDark
              ? "translate-x-10 bg-gray-800 shadow-[0_0_10px_2px_rgba(255,255,255,0.2)]"
              : "translate-x-0 bg-white shadow-[0_0_10px_2px_rgba(59,130,246,0.3)]"
          }
        `}
      >
        {/* 아이콘 */}
        {isDark ? <Icons name="moon" /> : <Icons name="sun" />}
      </div>

      {/* 상태 텍스트 */}
      <span
        className={`
        absolute right-2 text-xs font-medium
        transition-colors duration-300
        ${isDark ? "text-gray-300" : "text-gray-600"}
      `}
      >
        {isDark ? "다크" : "라이트"}
      </span>
    </button>
  );
};

export { FancyToggleTheme };
