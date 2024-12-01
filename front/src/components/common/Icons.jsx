import {
  BsHouse,
  BsCalendar4Event,
  BsBookmarks,
  BsHeart,
  BsSun,
  BsMoon,
  BsList,
  BsX
} from "react-icons/bs";

const icons = {
  house: BsHouse,
  calendar: BsCalendar4Event,
  bookmarks: BsBookmarks,
  heart: BsHeart,
  sun: BsSun,
  moon: BsMoon,
  x: BsX,
  menu: BsList,
};

export default function Icons({ name, className = "", size = "20" }) {
  const Icon = icons[name];
  return (
    <Icon 
      className={`inline-flex justify-center items-center ${className}`}
      size={size} 
    />
  );
}

// 사용 예시:
{/* <Icons name="x" size="24" className="text-2xl" /> */}
{/* <div className="pt-20 px-4"> */}