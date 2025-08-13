'use client'

import React from 'react'
import ProfileSec from './profileSec';
import RescheduleSec from './rescheduleSec';
import EventControlSec from './eventControlSec';
import { PopupMessageProvider } from '../contexts/providers/popupmessageProvider';

export default function Dashboard() {

    return (
        <>
            <PopupMessageProvider>
                <div className="mx-auto space-y-6">
                    <ProfileSec />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RescheduleSec />
                        <EventControlSec />
                    </div>
                </div>
            </PopupMessageProvider>
        </>
    )
}
