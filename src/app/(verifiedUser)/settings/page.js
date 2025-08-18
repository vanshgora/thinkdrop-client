'use client'

import EventControlSec from "./eventControlSec"
import RescheduleSec from "./rescheduleSec"
import DeleteAccount from "./deleteAccount"

export default function Settings() {
    return (
        <div className="mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RescheduleSec />
                <EventControlSec />
            </div>
            
            <DeleteAccount />
        </div>
    )
}