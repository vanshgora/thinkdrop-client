'use client'

import { useContext } from "react"
import { NavContext } from ".."

export const useNavContext = () => {
    const { activeTab, setActiveTab } = useContext(NavContext);

    return { activeTab, setActiveTab };
}