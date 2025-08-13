'use client'

import { useState, useEffect } from 'react';
import './popupmessage.css';

const PopupMessage = ({ message, type , isVisible , setIsVisible, onClose}) => {

    if (!isVisible) return null;

    const icon = type === 'success' ? '✓' : '✗';
    const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';

    return (
        <div
            className="popup-notification"
            style={{ backgroundColor }}
        >
            <div className="popup-content">
                <span className="popup-icon">{icon}</span>
                <span className="popup-message">{message}</span>
                <button
                    className="popup-close"
                    onClick={() => {
                        setIsVisible(false);
                        if (onClose) onClose();
                    }}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default PopupMessage;