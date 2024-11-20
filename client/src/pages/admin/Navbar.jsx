import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
    return (
      <div className="flex bg-background items-center justify-between p-4">
        {/* SEARCH BAR */}
        {/* <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <CiSearch size={14}/>
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent outline-none"
          />
        </div> */}
        {/* ICONS AND USER */}
        <div className="flex items-center gap-6 justify-end w-full">
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
            <FaMessage size={20}/>
          </div>
          <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
            <IoIosNotifications size={20}/>
            <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
              1
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs leading-3 font-medium">John Doe</span>
            <span className="text-[10px] text-gray-500 text-right">Admin</span>
          </div>
            <FaRegUserCircle size={36}/>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  