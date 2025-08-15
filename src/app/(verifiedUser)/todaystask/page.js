'use client'

import { getTodaysTask } from "@/services/userServices";
import { useEffect, useState } from "react";

export default function TodaysTask() {

    const [todaysTopic, setTodaysTopic] = useState();

    useEffect(() => {
        getTodaysTask().then((res) => {
            if (res.status === 200) {
                setTodaysTopic(res.data.task);
            }
        });
    }, []);

    return (
        <div>
            <div className="topic-section bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{todaysTopic && todaysTopic.name}</h2>
                <p className="text-gray-600">
                   {todaysTopic && todaysTopic.detail}
                </p>
            </div>

            <div className="task-section bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Today's Task
                </h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                    { todaysTopic && todaysTopic.task.map((step) => <li key={step}>{step}</li>)}
                </ul>
            </div>

            <div className="resources-section bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    Additional Resources
                </h3>
                <ul className="space-y-2">
                    { todaysTopic && todaysTopic.resources.map((resource) =>  <li key={resource} className="text-indigo-600 hover:text-indigo-800 transition duration-150">{resource}</li>)}
                </ul>
            </div>
        </div>
    )
}