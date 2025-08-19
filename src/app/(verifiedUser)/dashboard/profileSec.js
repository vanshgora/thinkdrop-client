'use client'
import { getUser } from '@/services/userServices'
import { months, timeTagMap } from '@/utils/data';
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export default function ProfileSec() {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser(getUser());
    }, []);

    const getTimeString = useCallback((time) => {
        const timeArr = time.split(":");
        let hours = Number(timeArr[0]) % 12;
        if (hours === 0) hours = 12;
        const minutes = timeArr[1];

        return `${hours}:${minutes} ${Number(timeArr[0]) >= 12 ? "PM" : "AM"}`;
    }, []);

    const getJoiningDate = useCallback(() => {
        const dateStr = new Date(user.createdAt);

        const date = dateStr.getDate();
        const month = months[dateStr.getMonth()];
        const year = dateStr.getFullYear();
        let datePrefix = 'th';
        if (date % 10 === 1) {
            datePrefix = 'st';
        } else if (date % 10 === 2) {
            datePrefix = 'nd';
        } else if (date % 10 === 3) {
            datePrefix = 'rd';
        }
        return `- Member Since: ${date}${datePrefix}, ${month} ${year}`
    }, [user]);

    return (
        <>
            <section id='profile-section' className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
                <div className='personal-info flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
                    <div className='sm:flex-shrink-0'>
                        <Image
                            src={'/user.png'}
                            className='rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 border-indigo-500 shadow-sm'
                            height={128}
                            width={128}
                            alt="Profile picture"
                        />
                    </div>

                    <div className='sm:w-full'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
                            <h1 className='text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left capitalize'>
                                {user?.name}
                            </h1>
                            {user && (
                                <span className="text-xs sm:text-sm font-normal bg-indigo-100 text-indigo-800 px-2 py-1 capitalize rounded-full w-fit mx-auto sm:mx-0">
                                    {timeTagMap[user.preferredTime]}
                                </span>
                            )}
                        </div>

                        <div className='user-email text-gray-600 flex items-center justify-center sm:justify-start mt-1 sm:mt-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className='text-sm sm:text-base'>{user?.email}</span>
                        </div>

                        <div className="mt-2 sm:mt-3 text-sm text-gray-500 text-center sm:text-left">
                            <span className="font-medium">Preferred Time:</span> {user && getTimeString(user.preferredTime)}
                        </div>
                    </div>
                </div>

                <div className='mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 italic text-center sm:text-left'>
                    {user && getJoiningDate()}
                </div>
            </section>
        </>
    )
}