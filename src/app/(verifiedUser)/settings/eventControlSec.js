'use client'

import { getUser, logout, updateEmialDelivery } from "@/services/userServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePopupMessageContext } from "../contexts/hooks/popupmessagecontexthook";

export default function EventControlSec() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showPauseConfirm, setShowPauseConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  const router = useRouter();
  const { showPopup } = usePopupMessageContext();

  const handleTogglePause = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await updateEmialDelivery({ isPaused: !user.isPaused, email: user.email });
      setUser(res.data.user);
      showPopup(
        `${res.data.user.isPaused ? 'Emails Paused' : 'Emails Resumed'} Successfully`, 
        "success"
      );
      setShowPauseConfirm(false);
    } catch (error) {
      showPopup(`Operation Failed. Please try again.`, "error");
      console.error("Failed to toggle pause:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Failed to logout:", error);
      showPopup("Logout failed. Please try again.", "error");
      setLogoutLoading(false);
      setShowLogoutConfirm(false);
    }
  };

  const getStatusDescription = () => {
    if (user?.isPaused) {
      return "Your email notifications are currently paused. You won't receive daily challenges until resumed.";
    }
    return "Your email notifications are active. You'll receive daily challenges at your scheduled time.";
  };

  return (
    <>
      <section className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300'>
        <div className="flex items-center mb-4">
          <div className="bg-indigo-100 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Account Actions</h2>
        </div>

        {/* Status Indicator */}
        <div className={`mb-6 p-4 rounded-lg border ${
          user?.isPaused 
            ? 'bg-yellow-50 border-yellow-200' 
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${
              user?.isPaused ? 'text-yellow-600' : 'text-green-600'
            }`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className={`text-sm ${user?.isPaused ? 'text-yellow-800' : 'text-green-800'}`}>
              {getStatusDescription()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Pause/Resume Button */}
          <button
            onClick={() => setShowPauseConfirm(true)}
            disabled={loading}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
              loading 
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                : user?.isPaused 
                  ? 'bg-green-100 hover:bg-green-200 text-green-700 shadow-sm hover:shadow-md' 
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 shadow-sm hover:shadow-md'
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                ? 'Resume Email Notifications'
                : 'Pause Email Notifications'}
          </button>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            disabled={logoutLoading}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
              logoutLoading 
                ? 'bg-red-200 text-red-700 cursor-not-allowed' 
                : 'bg-red-100 hover:bg-red-200 text-red-700 shadow-sm hover:shadow-md'
            }`}
          >
            {logoutLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2"
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

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact support if you have questions about your account settings.
          </p>
        </div>
      </section>

      {/* Confirmation Modals */}
      {showPauseConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {user?.isPaused ? 'Resume Email Notifications' : 'Pause Email Notifications'}
            </h3>
            <p className="text-gray-600 mb-6">
              {user?.isPaused 
                ? 'You will start receiving daily challenge emails again at your scheduled time.'
                : 'You will temporarily stop receiving daily challenge emails. You can resume anytime.'
              }
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowPauseConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleTogglePause}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You'll need to sign in again to access your challenges.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}