import { Link, useLocation } from "react-router-dom";
import In2Macy from "../../assets/IN2MACY_SAL 1.svg";
import NavChat from "../../assets/chat.svg";
import NavChats from "../../assets/Chats.svg";
import NavIcon from "../../assets/Icon.svg";
import NavHandHeart from "../../assets/HandHeart.svg";
import Image from "../../assets/image.png";

export const SideNav = () => {
  const location = useLocation();

  const navItems = [
    { img: NavChat, alt: "chat", path: "/chat" },
    { img: NavChats, alt: "chats", path: "/chats" },
    { img: NavIcon, alt: "icon", path: "#" },
    { img: NavHandHeart, alt: "handHeart", path: "#" },
  ];

  return (
    <nav className="bg-theme-dark-blue min-h-screen w-16 md:w-20 left-0 top-0 flex flex-col justify-between py-6 px-2 md:px-4">
      {/* Logo Section */}
      <div className="flex justify-center">
        <Link
          to="/"
          className="w-10 md:w-12 transition-transform hover:scale-105"
        >
          <img src={In2Macy} alt="logo" className="w-full h-auto" />
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col items-center space-y-8">
        {navItems.map((item) => (
          <Link
            key={item.alt}
            to={item.path}
            className={`w-8 md:w-10 transition-all duration-200 hover:scale-110 ${
              location.pathname === item.path
                ? "opacity-100 scale-125"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={item.img}
              alt={item.alt}
              className={`w-full h-auto ${
                location.pathname === item.path
                  ? "text-white fill-white stroke-white"
                  : ""
              }`}
            />
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      <div className="flex justify-center">
        <Link
          to="/profile"
          className="w-10 md:w-12 transition-transform hover:scale-105"
        >
          <img
            src={Image}
            alt="profile pic"
            className="w-full h-auto rounded-full border-2 border-transparent hover:border-theme-blue transition-colors"
          />
        </Link>
      </div>
    </nav>
  );
};
