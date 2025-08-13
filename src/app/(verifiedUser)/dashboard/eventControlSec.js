'use client'

import { getUser, logout, updateEmialDelivery } from "@/services/userServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePopupMessageContext } from "../contexts/hooks/popupmessagecontexthook";

export default function EventControlSec() {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const router = useRouter();

  const { showPopup } = usePopupMessageContext();

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await updateEmialDelivery({ isPaused: !user.isPaused, email: user.email });
      setUser(res.data.user);
      showPopup(`${res.data.user.isPaused ? 'Paused' : 'Resumed'} Successfully`, "success");
    } catch (error) {
      showPopup(`Operation Failed`, "error");
      console.error("Failed to toggle pause:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (loading) return;
    setLogoutLoading(true);
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Failed to toggle pause:", error);
    } finally {
      setLogoutLoading(false);
    }
  }

  return (
    <section className='bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col'>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h2>
      <div className="flex flex-col space-y-3 flex-grow justify-center">
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : user?.isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4l10 6-10 6V4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {loading
            ? 'Processing...'
            : user?.isPaused
              ? 'Resume Challenges'
              : 'Pause Challenges'}
        </button>
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`cursor-pointer w-full ${loading ? "bg-red-200" : "bg-red-100 hover:bg-red-200"
            } text-red-700 font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center`}
        >
          {logoutLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </section>
  )
}
