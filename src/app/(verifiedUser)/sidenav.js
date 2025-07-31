import React from 'react'

export default function SideNav() {
    return (
        <>
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
        </>
    )
}
