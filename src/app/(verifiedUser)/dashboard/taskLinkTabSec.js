'use client'

import { useRouter } from "next/navigation";
import { useNavContext } from "../contexts/hooks/navcontexthook";
import { useEffect, useState } from "react";
import { getTodaysTask, getUserTasks } from "@/services/userServices";

export default function TaskLinkTabSec() {
    const router = useRouter();
    const { setActiveTab } = useNavContext();

    const [todaysTopic, setTodaysTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchTodaysTask = async () => {
            try {
                setLoading(true);
                const res = await getTodaysTask();

                if (res.status === 200) {
                    setTodaysTopic(res.data.task);
                    const now = new Date();
                    const userTasks = await getUserTasks();
                    const task = userTasks.data?.userTasks.tasks[`${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`];
                    const calculatedProgress = task.taskTrack.reduce((acc, curr) => {
                        return acc + (curr ? 1 : 0);
                    }, 0) / task.taskTrack.length * 100;
                    setProgress(calculatedProgress);
                } else {
                    setError("Failed to load today's task");
                }
            } catch (err) {
                setError("An error occurred while fetching today's task");
                console.error("Error fetching today's task:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodaysTask();
    }, []);

    const truncateText = (text, maxLength = 200) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    const handleTaskClick = () => {
        setActiveTab('today\'s task');
        router.push('/todaystask');
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 50) return 'bg-blue-500';
        if (percentage >= 20) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Today's Task</h2>
                        <p className="text-sm text-gray-500">{formatDate(new Date())}</p>
                    </div>
                </div>
                <button
                    onClick={handleTaskClick}
                    className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100"
                    aria-label="View full task details"
                    title="View full task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            </div>

            {loading ? (
                <div className="animate-pulse bg-gray-100 rounded-lg p-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Try again
                    </button>
                </div>
            ) : todaysTopic ? (
                <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100 hover:border-indigo-200 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-800 text-lg">{todaysTopic.name}</h3>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Active
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {truncateText(todaysTopic.detail)}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-600">Progress</span>
                            <span className="text-xs font-medium text-gray-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full ${getProgressColor(progress)} transition-all duration-300`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                            Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                            onClick={handleTaskClick}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center cursor-pointer"
                        >
                            Continue task
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-600 text-sm mb-4">No task assigned for today</p>
                    <button
                        onClick={handleTaskClick}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                        Create a task
                    </button>
                </div>
            )}
        </section>
    );
}