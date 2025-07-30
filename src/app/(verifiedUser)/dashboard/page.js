import Image from 'next/image'
import React from 'react'

export default function Dashboard() {
    return (
        <>
            <div className="flex h-screen bg-gray-50">

                <div className="hidden md:flex md:flex-shrink-0">
                    <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
                        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">

                            <div className="flex-shrink-0 flex items-center px-4">
                                <h1 className="text-xl font-bold text-gray-900">ThinkDrop</h1>
                            </div>

                            <nav className="mt-5 flex-1 space-y-1 px-2">
                                <a
                                    href="#"
                                    className="bg-indigo-50 border-indigo-600 text-indigo-600 group flex items-center px-3 py-3 text-sm font-medium border-l-4"
                                >
                                    <svg
                                        className="text-indigo-500 mr-3 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                    Dashboard
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col flex-1 overflow-hidden">

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
                                            <span className="text-indigo-600 font-medium">VG</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        <div className="mx-auto space-y-6">
                            <section id='profile-section' className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                <div className='personal-info flex items-center gap-6'>
                                    <div className='profile-image'>
                                        <Image src={'/user.png'}
                                            className='rounded-full h-32 w-32 border-4 border-indigo-500 shadow-md' height={128}
                                            width={128} alt="Profile picture" />
                                    </div>
                                    <div>
                                        <h1 className='text-2xl font-bold text-gray-800'>
                                            Vansh Gora
                                            <span
                                                className="ml-2 text-sm font-normal bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Night
                                                Owl</span>
                                        </h1>
                                        <div className='user-email text-gray-600 flex items-center mt-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            vanshgora31@gmail.com
                                        </div>
                                        <div className="mt-3 text-sm text-gray-500">
                                            <span className="font-medium">Preferred Time:</span> 7:30 AM - Default
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4 text-gray-500 text-sm italic'>- Member since 20th, may, 2025</div>
                            </section>

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
                                            <option value="06:00">6:00 AM - Early Bird</option>
                                            <option value="07:00">7:00 AM - Morning Boost</option>
                                            <option value="07:30">7:30 AM - Default</option>
                                            <option value="08:00">8:00 AM - Commute Ready</option>
                                            <option value="09:00">9:00 AM - Work Start</option>
                                            <option value="12:00">12:00 PM - Lunch Break</option>
                                            <option value="17:00">5:00 PM - After Work</option>
                                            <option value="18:00">6:00 PM - Evening Wind-down</option>
                                            <option value="19:00">7:00 PM - Dinner Time</option>
                                            <option value="20:00">8:00 PM - Night Owl</option>
                                            <option value="21:00">9:00 PM - Before Bed</option>
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
                    </main>
                </div>
            </div>
        </>
    )
}
