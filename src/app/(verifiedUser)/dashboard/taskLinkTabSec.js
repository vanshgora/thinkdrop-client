'use client'

import { useRouter } from "next/navigation";
import { useNavContext } from "../contexts/hooks/navcontexthook";
import { useEffect, useState } from "react";
import { getTodaysTask } from "@/services/userServices";

export default function TaskLinkTabSec() {

    const router = useRouter();
    const { setActiveTab } = useNavContext();

    const [todaysTopic, setTodaysTopic] = useState();

    useEffect(() => {
        getTodaysTask().then((res) => {
            if (res.status === 200) {
                setTodaysTopic(res.data.task);
            }
        });
    }, []);

    const truncateText = (text, maxLength = 450) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    const handleTaskClick = () => {
        setActiveTab('today\'s task');
        router.push('/todaystask');
    };

    return (
        <section id='profile-section' className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-indigo-600 font-bold">Today's Task</h2>
                <button
                    onClick={handleTaskClick}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    aria-label="View full task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">{todaysTopic && todaysTopic.name}</h3>
                <p className="text-gray-600 text-sm">
                    {todaysTopic && truncateText(todaysTopic.detail || "No task assigned for today. Click the icon to view or add tasks.")}
                </p>
            </div>
        </section>
    )
}
