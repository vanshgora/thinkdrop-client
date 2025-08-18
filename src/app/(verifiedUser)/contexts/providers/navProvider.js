'use client'

import { useEffect, useState } from "react";
import { NavContext } from "..";
import { usePathname } from "next/navigation";

export const NavContextProvider = ({ children }) => {

    const [activeTab, setActiveTab] = useState('');

    const pathName = usePathname();

    const pathTabMap = {
        "/dashboard": "dashboard",
        "/todaystask": "today's task",
        "/settings": "settings"
    };

    useEffect(() => {
        setActiveTab(pathTabMap[pathName]);
    },[])

    return (
        <>
            <NavContext.Provider value={{ activeTab: activeTab, setActiveTab: setActiveTab }}>
                {children}
            </NavContext.Provider>
        </>
    );
}