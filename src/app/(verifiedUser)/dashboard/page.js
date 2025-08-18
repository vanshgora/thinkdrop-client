'use client'

import React from 'react'
import ProfileSec from './profileSec';
import TaskLinkTabSec from './taskLinkTabSec';

export default function Dashboard() {

    return (
        <>
            <div className="mx-auto space-y-6">
                <ProfileSec />
                <TaskLinkTabSec />
            </div>
        </>
    )
}
