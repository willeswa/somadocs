import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import DropdownSelector from "./DropdownSelector";
import ProcessedFiles from "./ProcessedFiles";

type SideNavbarProps = {
  entries: Array<string>[],
}

function SideNavbar({entries}: SideNavbarProps) {
  const setSelected = () => {

  }
  return (
    <aside id="logo-sidebar" className="pt-20 sm:w-1/5 w-full min-h-full  border-r border-gray-200 bg-white" aria-label="Sidebar">
    <div className="h-full px-3 pb-4  bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
        {/* <li>
          <DropdownSelector entries={entries} selected={selected} setSelected={setSelected} />
        </li>

        <li>
          <DropdownSelector entries={entries} selected={selected} setSelected={setSelected} />
        </li> */}
        <li>
          <a href="#" className="flex items-center p-2 border border-gray-300 bg-orange-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
            <span className="flex-1 ml-3 whitespace-nowrap text-gray-200">Sign Up</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
  );
}

export default SideNavbar;