import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FiSidebar } from "react-icons/fi";
import { motion } from "framer-motion";

import {
  PiReceiptLight,
  PiUsersLight,
  PiChatCircleLight,
  PiStethoscopeLight,
  PiCalendarBlankLight,
  PiGearLight,
  PiBooksLight,
  PiMegaphoneThin,
  PiUserCircleLight,
  PiBedLight,
  PiRobotLight,
  PiCaretDown,
  PiCaretUp,
} from "react-icons/pi";

const navLinks = [
  { name: "Dashboard", icon: <PiGearLight />, to: "/" },
  { name: "Invoice", icon: <PiReceiptLight />, to: "/invoice" },
  { name: "Patient Queue", icon: <PiUsersLight />, to: "/patient-queue" },
  { name: "Create Rx", icon: <PiStethoscopeLight />, to: "/create-rx" },
  { name: "All Patients", icon: <PiUserCircleLight />, to: "/all-patients" },
  { name: "Appointments", icon: <PiCalendarBlankLight />, to: "/appointments" },
  { name: "IPD", icon: <PiBedLight />, to: "/ipd" },
  { name: "Messages", icon: <PiChatCircleLight />, to: "/messages" },
  { name: "Social", icon: <PiMegaphoneThin />, to: "/social" },
  { name: "Automation", icon: <PiRobotLight />, to: "/automation" },
  { name: "More" },
  { name: "Library", icon: <PiBooksLight /> },
  { name: "User", icon: <PiUserCircleLight />, to: "/user" },
  { name: "Settings", icon: <PiGearLight />, to: "/settings" },
];

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: "-100%" },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Mobile) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        {!isOpen && (
          <button
            className="p-2 rounded-md bg-white shadow"
            onClick={() => setIsOpen(true)}
          >
            <FiSidebar size={20} />
          </button>
        )}
      </div>

      {/* Sidebar Mobile */}
      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg p-4 lg:hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="">Saaro <span className="border">health</span></h1>
          <button onClick={() => setIsOpen(false)}>
            <RxCross2 size={20} />
          </button>
        </div>
        <SidebarContent isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      </motion.aside>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col h-screen w-[250px] p-4 bg-white shadow-sm">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-semibold flex items-center gap-1">
            <span className="text-purple-600">Saaro</span>{" "}
            <span className="text-green-600 border border-green-600 px-2 py-0.5 rounded-full p-1">
              health
            </span>
          </h1>
        </div>
        <SidebarContent isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      </aside>
    </>
  );
};

const SidebarContent = ({ isLibraryOpen, setIsLibraryOpen }) => (
  <nav className="space-y-1">
    {navLinks.map((link, index) => {
      if (link.name.toLowerCase() === "more") {
        return (
          <div
            key={`section-${index}`}
            className="mt-4 mb-2 px-3 text-sm font-semibold text-gray-400 uppercase"
          >
            More
          </div>
        );
      }

      if (link.name.toLowerCase() === "library") {
        return (
          <div key="library">
            <button
              onClick={() => setIsLibraryOpen(!isLibraryOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-700 rounded-lg hover:bg-[#e6ddfa] transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg"><PiBooksLight /></span>
                <span className="text-sm">Library</span>
              </div>
              {isLibraryOpen ? <PiCaretUp /> : <PiCaretDown />}
            </button>
            {isLibraryOpen && (
              <div className="ml-6 space-y-1 text-sm text-gray-600">
                <NavLink to="/template-library" className={({ isActive }) =>
                  `block px-3 py-1 rounded hover:bg-gray-100 ${isActive ? "font-semibold bg-[#e6ddfa] text-black" : ""}`}>Template</NavLink>
                <NavLink to="/medicine-library" className={({ isActive }) =>
                  `block px-3 py-1 rounded hover:bg-gray-100 ${isActive ? "font-semibold bg-[#e6ddfa] text-black" : ""}`}>Medicine</NavLink>
                <NavLink to="/dropdown-library" className={({ isActive }) =>
                  `block px-3 py-1 rounded hover:bg-gray-100 ${isActive ? "font-semibold bg-[#e6ddfa] text-black" : ""}`}>Dropdown</NavLink>
              </div>
            )}
          </div>
        );
      }

      return (
        <NavLink
          key={link.name}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#e6ddfa] transition ${
              isActive ? "bg-bg-[#e6ddfa] font-semibold" : "text-gray-700"
            }`
          }
        >
          <span className="text-lg">{link.icon}</span>
          <span className="text-sm">{link.name}</span>
        </NavLink>
      );
    })}
  </nav>
);

export default Sidebar;
