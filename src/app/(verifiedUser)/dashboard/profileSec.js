'use client'
import { getUser, getUserTasks } from '@/services/userServices'
import { months, timeTagMap } from '@/utils/data';
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function ProfileSec() {
    const [user, setUser] = useState(null);
    const [userTasks, setUserTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const userData = getUser();
            setUser(userData);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => { 
        async function initilzeUserTasks() {
            const res = await getUserTasks();
            setUserTasks(res.data.userTasks);
        }

        initilzeUserTasks();
    }, []);

    const completedTaskNum = useMemo(() => {
        if(!userTasks) return 0;
        return Object.keys(userTasks.tasks).filter(t => t.length && !t.find(false)).length;
    }, []);

    const successRate = useMemo(() => {
        if(!userTasks || !completedTaskNum || completedTaskNum == 0) return 0;
        return completedTaskNum*100/Object.keys(userTasks.tasks).length;
    }, []);

    const getTimeString = useCallback((time) => {
        if (!time) return "Not set";
        const timeArr = time.split(":");
        let hours = Number(timeArr[0]) % 12;
        if (hours === 0) hours = 12;
        const minutes = timeArr[1];

        return `${hours}:${minutes} ${Number(timeArr[0]) >= 12 ? "PM" : "AM"}`;
    }, []);

    const getJoiningDate = useCallback(() => {
        if (!user?.createdAt) return "Member since: Unknown";

        const dateStr = new Date(user.createdAt);
        const date = dateStr.getDate();
        const month = months[dateStr.getMonth()];
        const year = dateStr.getFullYear();

        let datePrefix = 'th';
        if (date % 10 === 1 && date !== 11) {
            datePrefix = 'st';
        } else if (date % 10 === 2 && date !== 12) {
            datePrefix = 'nd';
        } else if (date % 10 === 3 && date !== 13) {
            datePrefix = 'rd';
        }

        return `Member since ${date}${datePrefix} ${month}, ${year}`;
    }, [user]);

    const getDaysSinceJoin = useCallback(() => {
        if (!user?.createdAt) return 0;
        const joinDate = new Date(user.createdAt);
        const today = new Date();
        const diffTime = Math.abs(today - joinDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, [user]);

    if (loading) {
        return (
            <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="rounded-full bg-gray-300 h-32 w-32"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Profile Information
                    </h2>
                    {/* <button 
                        onClick={() => setShowEditModal(true)}
                        className="text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Edit profile"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button> */}
                </div>

                <div className='personal-info flex flex-col sm:flex-row items-center gap-6'>
                    <div className='relative'>
                        <Image
                            src={'/user.png'}
                            className='rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 border-indigo-100 shadow-md'
                            height={128}
                            width={128}
                            alt="Profile picture"
                        />
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className='flex-1 text-center sm:text-left'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start'>
                            <h1 className='text-2xl font-bold text-gray-800 capitalize'>
                                {user?.name || 'Unknown User'}
                            </h1>
                            {user?.preferredTime && (
                                <span className="text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 capitalize rounded-full">
                                    {timeTagMap[user.preferredTime] || 'Anytime'}
                                </span>
                            )}
                        </div>

                        <div className='user-email text-gray-600 flex items-center justify-center sm:justify-start mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className='text-base'>{user?.email || 'No email provided'}</span>
                        </div>

                        <div className="mt-3 flex items-center justify-center sm:justify-start text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">
                                <span className="font-medium">Preferred Time:</span> {user ? getTimeString(user.preferredTime) : 'Not set'}
                            </span>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                {user && getJoiningDate()}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                {getDaysSinceJoin()} days with us
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{(userTasks && userTasks.tasks) ? Object.keys(userTasks.tasks).length : 0}</div>
                        <div className="text-xs text-gray-500">Total Tasks</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{completedTaskNum}</div>
                        <div className="text-xs text-gray-500">Tasks Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{successRate}%</div>
                        <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                </div>
            </section>

            {/* {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                        <p className="text-gray-600 mb-4">Profile editing functionality would go here.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
}