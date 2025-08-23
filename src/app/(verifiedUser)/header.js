'use client'

import { getUser, logout } from "@/services/userServices";
import { useState, useEffect, useRef } from "react"
import { useNavContext } from "./contexts/hooks/navcontexthook";
import { usePopupMessageContext } from "./contexts/hooks/popupmessagecontexthook";
import { timeTagMap } from "@/utils/data";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  const userMenuRef = useRef(null);

  const { activeTab, windowWidth, isNavOpen, setIsNavOpen } = useNavContext();

  useEffect(() => {
    setUser(getUser());

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const abbreviate = (name) => {
    if (!name) return "U";
    const nameArr = name.split(' ');
    const resultArr = [];
    for (let i = 0; i < nameArr.length; i++) {
      if (nameArr[i].length > 0) {
        resultArr.push(nameArr[i][0].toUpperCase());
      }
      if (i >= 1) break;
    }
    return resultArr.join('');
  }

  const handleLogout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    try {
      await logout();
      setLogoutLoading(false);
      router.push('/');
    } catch (error) {
      console.error("Failed to logout:", error);
      setLogoutLoading(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className={`mr-3 text-gray-600 hover:text-indigo-600 p-1 rounded-md hover:bg-gray-100 transition-colors ${(windowWidth >= 680) && isNavOpen ? 'hidden' : ''}`}
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              <span className="text-indigo-600 capitalize">{activeTab}</span>
            </h1>
          </div>

          <div className="flex items-center space-x-3">

            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="User menu"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                  <span className="text-indigo-600 uppercase font-medium text-sm">
                    {user && abbreviate(user.name)}
                  </span>
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-xs font-medium text-gray-700">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user && timeTagMap[user?.preferredTime] || 'Member'}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900 capitalize">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div className="py-1">
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}