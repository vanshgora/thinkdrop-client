'use client'

import { useState } from "react";
import { NavContext } from "..";

export const NavContextProvider = ({ children }) => {

    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <>
            <NavContext.Provider value={{ activeTab: activeTab, setActiveTab: setActiveTab }}>
                {children}
            </NavContext.Provider>
        </>
    );
}