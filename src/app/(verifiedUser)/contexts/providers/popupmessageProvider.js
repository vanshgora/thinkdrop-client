'use client'

import { useState, useRef } from "react";
import PopupMessage from "@/components/popupmessage/popupmessage";
import { PopupMessageContext } from "..";

export const PopupMessageProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("Default popup message");
    const [type, setType] = useState("success");
    const timerRef = useRef(null);

    const showPopup = (msg, msgType = "success") => {
        setMessage(msg);
        setType(msgType);
        setIsVisible(true);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    };

    return (
        <PopupMessageContext.Provider value={{ showPopup }}>
            {children}
            <PopupMessage
                message={message}
                type={type}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
        </PopupMessageContext.Provider>
    );
};
