'use client'
import { createContext } from "react";

const PopupMessageContext = createContext({
    message: "",
    type: "success",
    showPopup: () => { },
});

const NavContext = createContext({
    activeTab: 'dashboard',
    setActiveTab: () => { },
    isNavOpen: false,
    setIsNavOpen: () => {},
    windowWidth: 1024,
});

export { PopupMessageContext, NavContext }