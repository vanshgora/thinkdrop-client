'use client'
import { createContext } from "react";

const PopupMessageContext = createContext({
    message: "",
    type: "success",
    showPopup: () => { },
});

const NavContext = createContext({
    activeTab: 'dashboard',
    setActiveTab: () => { }
});

export { PopupMessageContext, NavContext }