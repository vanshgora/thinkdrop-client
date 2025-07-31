import { timeTagMap } from '@/utils/data';
import React from 'react'
import ProfileSec from './profileSec';

export default function Dashboard() {
    return (
        <>
            <div className="mx-auto space-y-6">
                <ProfileSec/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className='bg-white rounded-xl shadow-md p-6 border border-gray-200'>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Challenge Time</h2>
                        <div className='update-form'>
                            <label htmlFor="preferred-time"
                                className="block text-sm font-medium text-gray-700 mb-2">
                                Select preferred time
                            </label>
                            <select id="preferred-time" name="preferred-time"
                                className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required defaultValue={"07:30"}>
                                <option value="">Select your preferred time</option>
                                {Object.keys(timeTagMap).map((key) => {
                                    const timeArr = key.split(":");
                                    let hours = Number(timeArr[0]) % 12;
                                    if (hours === 0) hours = 12;
                                    const minutes = timeArr[1];
                                    return (<option value={key} key={key}>{hours}:{minutes} {timeArr[0] >= 12 ? " PM" : " AM"}  - {timeTagMap[key]}</option>)
                                })}
                            </select>
                            <button
                                className="cursor-pointer mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                                Update Schedule
                            </button>
                        </div>
                    </section>

                    <section className='bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col'>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h2>
                        <div className="flex flex-col space-y-3 flex-grow justify-center">
                            <button
                                className="w-full cursor-pointer cu bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd" />
                                </svg>
                                Pause Challenges
                            </button>
                            <button
                                className="cursor-pointer w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-lg transition duration-150 ease-in-out flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                        clipRule="evenodd" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
