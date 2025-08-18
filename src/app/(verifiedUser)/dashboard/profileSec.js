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
            <section id='profile-section' className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className='personal-info flex items-center gap-6'>
                    <div className='profile-image'>
                        <Image src={'/user.png'}
                            className='rounded-full h-32 w-32 border-4 border-indigo-500 shadow-md' height={128}
                            width={128} alt="Profile picture" />
                    </div>
                    <div>
                        <h1 className='text-2xl capitalize font-bold text-gray-800'>
                            {user && user.name}
                            <span
                                className="ml-2 text-sm font-normal bg-indigo-100 text-indigo-800 px-2 py-1 capitalize rounded-full">{user && timeTagMap[user.preferredTime]}</span>
                        </h1>
                        <div className='user-email text-gray-600 flex items-center mt-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {user && user.email}
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            <span className="font-medium">Preferred Time:</span> {user && getTimeString(user.preferredTime)} <span>{(user && user.isPaused) ? "" : ``}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-4 text-gray-500 text-sm italic'>{user && getJoiningDate()}</div>
            </section>
        </>
    )
}