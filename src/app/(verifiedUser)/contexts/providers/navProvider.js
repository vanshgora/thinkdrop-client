'use client'

import { useEffect, useState } from "react";
import { NavContext } from "..";
import { usePathname } from "next/navigation";

export const NavContextProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState('');
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);

    const pathName = usePathname();

    const pathTabMap = {
        "/dashboard": "dashboard",
        "/todaystask": "today's task",
        "/settings": "settings"
    };

    useEffect(() => {
        setActiveTab(pathTabMap[pathName]);
        if(windowWidth > 680) setIsNavOpen(true);
    }, [pathName]);

    const handleWindowResize = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
        setIsNavOpen(width >= 680);
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <NavContext.Provider
            value={{
                activeTab,
                setActiveTab,
                isNavOpen,
                setIsNavOpen,
                windowWidth
            }}
        >
            {children}
        </NavContext.Provider>
    );
};
