'use client'
import { useRouter } from 'next/navigation';
import { useNavContext } from './contexts/hooks/navcontexthook'
import { useState, useEffect } from 'react';
import { timeTagMap } from '@/utils/data';
import { getUser } from '@/services/userServices';

export default function SideNav() {
    const { activeTab, setActiveTab, isNavOpen, setIsNavOpen, windowWidth } = useNavContext();
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (windowWidth < 680 && isNavOpen) {
                const navElement = document.querySelector('.side-nav');
                if (navElement && !navElement.contains(event.target)) {
                    setIsNavOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [windowWidth, isNavOpen, setIsNavOpen]);

    useEffect(() => setUser(getUser), []);

    const abbreviate = (name) => {
        if (!name) return "U";
        const nameArr = name.split(' ');
        const resultArr = [];
        for (let i = 0; i < nameArr.length; i++) {
            if (nameArr[i].length > 0) {
                resultArr.push(nameArr[i][0].toUpperCase());
            }
            if (i >= 1) break;
        }
        return resultArr.join('');
    }

    const navItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            path: '/dashboard',
            icon: (
                <svg className="mr-3 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            )
        },
        {
            id: 'today\'s task',
            name: 'Today\'s Tasks',
            path: '/todaystask',
            icon: (
                <svg className="mr-3 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            id: 'settings',
            name: 'Settings',
            path: '/settings',
            icon: (
                <svg className="mr-3 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    const handleNavigation = (item) => {
        setActiveTab(item.id);
        router.push(item.path);
        if (windowWidth < 680) {
            setIsNavOpen(false);
        }
    };

    return (
        <>
            {isNavOpen && windowWidth < 680 && (
                <div
                    className="fixed inset-0 bg-gray-800/60 z-40 transition-opacity duration-300"
                    onClick={() => setIsNavOpen(false)}
                ></div>
            )}

            <div
                className={`side-nav fixed z-50 flex flex-col h-full bg-white shadow-xl transition-all duration-300 ease-in-out
                    ${isNavOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} 
                    ${windowWidth >= 680 ? 'relative z-0 translate-x-0 w-64' : ''}
                    ${windowWidth >= 680 && !isNavOpen ? 'w-20' : ''}
                    ${windowWidth >= 680 && isHovering && !isNavOpen ? 'w-64 shadow-lg' : ''}`}
                onMouseEnter={() => windowWidth >= 680 && setIsHovering(true)}
                onMouseLeave={() => windowWidth >= 680 && setIsHovering(false)}
            >
                <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center px-4 mb-6">
                        {((windowWidth >= 680 && isNavOpen) || (windowWidth >= 680 && isHovering) || windowWidth < 680) ? (
                            <>
                                {(windowWidth < 680) && <button
                                    className="mr-3 text-gray-600 hover:text-indigo-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>}
                                <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">ThinkDrop</h1>
                            </>
                        ) : (
                            <button
                                className="mx-auto text-gray-600 hover:text-indigo-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                                onClick={() => setIsNavOpen(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <nav className="flex-1 px-2 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item)}
                                className={`group flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                    ${activeTab === item.id
                                        ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                    ${(windowWidth >= 680 && !isNavOpen && !isHovering) ? 'justify-center px-2' : ''}`}
                            >
                                <div className={`${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                    {item.icon}
                                </div>
                                {((windowWidth >= 680 && isNavOpen) || (windowWidth >= 680 && isHovering) || windowWidth < 680) && (
                                    <span className="whitespace-nowrap">{item.name}</span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className={`mt-auto px-2 py-4 border-t border-gray-200 ${(windowWidth >= 680 && !isNavOpen && !isHovering) ? 'hidden' : ''}`}>
                        <div className="flex items-center px-3 py-2">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-medium">{user && abbreviate(user.name)}</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user && user.name}</p>
                                <p className="text-xs text-gray-500">{user && timeTagMap[user?.preferredTime]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}