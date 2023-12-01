import React from "react";
import logo from "@/logos/logo-white-text.png";
import { useUser } from "@/contexts/authContext";
import { Icon } from '@iconify/react';
import { User } from "@hienpham512/angouleme-types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Dropdown from "./Dropdown";
import { useAuth } from "@/hooks/useAuth";

interface INavbar { }

const Navbar: React.FC = ({ }: INavbar) => {
  const user = useUser();
  const auth = useAuth();

  const { signout } = auth;

  const [userInfo, setUserInfo] = React.useState<User | undefined>();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [showInput, setShowInput] = React.useState(false);
  const [showBrowserDropdown, setShowBrowserDropdown] = React.useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  const getUserInfo = (uid: string) => {
    getDoc(doc(db, "users", uid || ""))
      .then((doc) => {
        if (doc.exists()) {
          setUserInfo((doc.data()) as User);
        }
      })
  };

  React.useEffect(() => {
    if (user) {
      getUserInfo(user.uid);
    }
  }, [user]);

  const BrowserOptions = [
    {
      label: "Home",
      key: "home",
      icon: "mdi:home",
    },
    {
      label: "My lists",
      key: "myLists",
      icon: "mdi:format-list-bulleted",
    },
    {
      label: "Favorites",
      key: "favorites",
      icon: "mdi:heart",
    },
  ];

  const profileOptions = [
    {
      label: "Profile",
      key: "profile",
      icon: "mdi:account",
    },
    {
      label: "Settings",
      key: "settings",
      icon: "mdi:cog",
    },
    {
      label: "Logout",
      key: "logout",
      icon: "mdi:logout",
    }

  ]

  return (
    <div className="bg-blue-900 p-2 flex items-center w-screen justify-between z-50 sticky top-0">
      <div className="flex justify-center items-center gap-5 ">
        <img src={logo} alt="logo" className="w-14 h-14 md:w-20 md:h-20" />

        <div className="relative md:hidden">
          <div
            onClick={() => setShowBrowserDropdown(!showBrowserDropdown)}
            className="flex justify-center items-center cursor-pointer underline text-white">
            <span>
              {BrowserOptions[selectedTab].label}
            </span>
            <Icon icon="gridicons:dropdown" width="1rem" height="1rem" />
          </div>
          <Dropdown
            options={BrowserOptions}
            isShown={showBrowserDropdown}
            setIsShown={setShowBrowserDropdown}
            handleSelect={(key) => setSelectedTab(key)}
          />
        </div>

        <div className="hidden md:flex gap-5">
          {BrowserOptions.map((option, index) => (
            <div key={index} className={`flex items-center gap-1 text-white ${selectedTab === index ? 'underline' : ''} hover:underline hover:text-blue-200 hover:scale-105 duration-300 ease-in-out cursor-pointer font-semibold whitespace-nowrap`}>
              <Icon icon={option.icon} width="1.5rem" height="1.5rem" />
              <span>
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div className="flex justify-end items-center relative">
          {showInput && <input type="text" placeholder="Search" className="bg-blue-800 text-white rounded-full p-2 w-40 md:w-60 transition duration-300 ease-in-out" />}
          <Icon
            onClick={() => setShowInput(true)}
            icon="pepicons-pop:loop" width="2rem" height="2rem" className="absolute text-white hover:scale-110 hover:text-blue-200 duration-300 ease-in-out cursor-pointer p-1 md:p-0 mr-2" />
        </div>
        <Icon icon="tabler:bell" width="2rem" height="2rem" className="text-white hover:scale-110 hover:text-blue-200 duration-300 ease-in-out cursor-pointer" />
        <div
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className="relative">
          {
            userInfo && userInfo.avatar !== "" ?
              <div className="flex justify-center items-center hover:scale-110 hover:text-blue-200 duration-300 ease-in-out cursor-pointer">
                <img src={userInfo.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                <Icon icon="gridicons:dropdown" width="1rem" height="1rem" className="text-white" />
              </div>
              :
              <div className="flex justify-center items-center hover:scale-110 hover:text-blue-200 duration-300 ease-in-out cursor-pointer text-white">
                <div className=" rounded-full p-1 border-white border">
                  <Icon icon="ic:round-perm-identity" width="2rem" height="2rem" />
                </div>
                <Icon icon="gridicons:dropdown" width="1rem" height="1rem" />
              </div>
          }
          <Dropdown
            className="right-0"
            options={profileOptions}
            isShown={showProfileDropdown}
            setIsShown={setShowProfileDropdown}
            handleSelect={(key) => {
              if (key === profileOptions.length - 1) {
                signout();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
