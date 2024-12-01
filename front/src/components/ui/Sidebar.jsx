import { Link, useLocation } from "react-router-dom";
import SidebarList from "./SidebarList";
import { leftSideElements } from "../../constants/sidebarList";
import Icons from "../common/Icons";

export default function LeftSidebar() {
  const location = useLocation();
  return (
    <div className="md:flex hidden min-h-screen min-w-56  flex-col border-r bg-card border-border/50">
      <div className="flex flex-col sticky left-0 right-0 top-0 py-5 ">
        <Link to={"/"} className="py-2 text-center text-2xl font-bold">
          My App
        </Link>
        <div className="mt-8">
          {leftSideElements.map((v) => (
            <Link
              to={v.to}
              key={v.name}
              className={`${
                location.pathname == v.to &&
                "bg-gradient-to-r from-cyan-300/80 to-blue-200/80 text-black font-semibold"
              } mb-1.5 flex items-center gap-4 py-3 px-5 duration-150 hover:bg-active`}
            >
              <Icons name={v.name} />
              <div className="text-sm">{v.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
