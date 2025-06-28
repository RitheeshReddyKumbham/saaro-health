import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white px-6 py-3  flex justify-between items-center w-full">
      <div></div>
      <div className="flex items-center gap-4">
        
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <IoMdNotifications/>
        </div>
        <CgProfile/>
      </div>
    </header>
  );
};

export default Header;
