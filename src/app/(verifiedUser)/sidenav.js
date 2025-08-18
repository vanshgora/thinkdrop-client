'use client'
import { useRouter } from 'next/navigation';
import { useNavContext } from './contexts/hooks/navcontexthook'

export default function SideNav() {

    const { activeTab, setActiveTab } = useNavContext();

    const router = useRouter();

    return (
        <>
            <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
                <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">

                    <div className="flex-shrink-0 flex items-center px-4">
                        <h1 className="text-xl font-bold text-gray-900">ThinkDrop</h1>
                    </div>

                    <nav className="mt-5 flex-1 space-y-1 px-2">
                        <a
                            onClick={() => {
                                setActiveTab('dashboard');
                                router.push('/dashboard');
                            }}
                            className={`${(activeTab === 'dashboard') && 'bg-indigo-50 border-indigo-600 text-indigo-600 border-l-4'} group flex items-center px-3 py-3 text-sm font-medium`}
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
                        <a
                            onClick={() => {
                                setActiveTab('today\'s task');
                                router.push('/todaystask');
                            }}
                            className={`${(activeTab === 'today\'s task') && 'bg-indigo-50 border-indigo-600 text-indigo-600 border-l-4'} group flex items-center px-3 py-3 text-sm font-medium`}
                        >
                            <svg
                                className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Today's Tasks
                        </a>
                        <a
                            onClick={() => {
                                setActiveTab('settings');
                                router.push('/settings');
                            }}
                            className={`${(activeTab === 'settings') && 'bg-indigo-50 border-indigo-600 text-indigo-600 border-l-4'} group flex items-center px-3 py-3 text-sm font-medium`}
                        >
                            <svg
                                className="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Settings
                        </a>
                    </nav>
                </div>
            </div>
        </>
    )
}