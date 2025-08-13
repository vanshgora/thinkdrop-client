'use client'

import { getUser } from "@/services/userServices";
import { useState, useEffect } from "react"

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser()); // runs only on client
  }, []);

  const abbriviate = (name) => {
    const nameArr = name.split(' ');
    const resultArr = [];
    for (let i = 0; i < nameArr.length; i++) {
      resultArr.push(nameArr[i][0].toUpperCase());
      if (i >= 2) break;
    }
    return resultArr.join('');
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              <span className="text-indigo-600">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 uppercase font-medium">
                  {user && abbriviate(user.name)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
