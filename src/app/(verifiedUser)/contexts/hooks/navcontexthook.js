'use client'

import { useContext } from "react"
import { NavContext } from ".."

export const useNavContext = () => {
    const { activeTab, setActiveTab, isNavOpen, setIsNavOpen, windowWidth } = useContext(NavContext);

    return { activeTab, setActiveTab, isNavOpen, setIsNavOpen, windowWidth };
}