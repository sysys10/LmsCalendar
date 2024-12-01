import { Link } from "react-router-dom";
import { leftSideElements } from "../../constants/sidebarList";
import Icons from "../common/Icons";

export default function SidebarList() {
  return (
    <>
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
    </>
  );
}
