'use client'

import { getTodaysTask, getUserTasks, updateUserTasks } from "@/services/userServices";
import { useEffect, useState } from "react";
import { usePopupMessageContext } from "../contexts/hooks/popupmessagecontexthook";

export default function TodaysTask() {
    const [todaysTopic, setTodaysTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(new Set());
    const [progress, setProgress] = useState(0);
    const [saving, setSaving] = useState(false);

    const { showPopup } = usePopupMessageContext();

    useEffect(() => {
        const fetchTodaysTask = async () => {
            try {
                setLoading(true);
                const res = await getTodaysTask();
                if (res.status === 200) {
                    setTodaysTopic(res.data.task);
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

    useEffect(() => {
        async function initilzeCompletedTasks() {
            const res = await getUserTasks();
            const completedTasks = new Set();

            const today = new Date();
            const date = today.getDate();
            const month = today.getMonth();
            const year = today.getFullYear();

            const dateStr = `${date}/${month}/${year}`;

            console.log(dateStr);

            const tasksArr = res.data.userTasks.tasks[dateStr].taskTrack;
            console.log(tasksArr);

            tasksArr.forEach((task, index) => {
                if (task === true) {
                    completedTasks.add(index);
                }
            });

            setCompletedTasks(completedTasks);
        }
        initilzeCompletedTasks();
    }, []);

    useEffect(() => {
        if (todaysTopic?.task) {
            const completedCount = completedTasks.size;
            const totalTasks = todaysTopic.task.length;
            const newProgress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
            setProgress(newProgress);
        }
    }, [completedTasks, todaysTopic]);

    const toggleTaskCompletion = (index) => {
        setCompletedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    function highlightBoldText(str, index) {
        const parts = str.split(/\*\*(.*?)\*\*/g);

        return (
            <div className="flex items-start gap-3">
                <button
                    onClick={() => toggleTaskCompletion(index)}
                    className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${completedTasks.has(index)
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300 hover:border-indigo-400'
                        }`}
                    aria-label={completedTasks.has(index) ? "Mark as incomplete" : "Mark as complete"}
                >
                    {completedTasks.has(index) && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
                <span className={`text-gray-700 flex-1 ${completedTasks.has(index) ? 'line-through text-gray-400' : ''}`}>
                    {parts.map((part, i) =>
                        i % 2 === 1 ? (
                            <span key={i} className="text-indigo-600 font-bold">
                                {part}
                            </span>
                        ) : (
                            part
                        )
                    )}
                </span>
            </div>
        );
    }

    function extractLinkParts(str) {
        const regex = /(https?:\/\/[^\s]+)/;
        const match = str.match(regex);

        if (!match) {
            return {
                before: str,
                link: null,
                after: ""
            };
        }

        const link = match[0];
        const before = str.substring(0, match.index);
        const after = str.substring(match.index + link.length);

        return { before, link, after };
    }

    const formatResource = (resource, index) => {
        const { before, link, after } = extractLinkParts(resource);
        return (
            <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">
                    {before && <span>{before} </span>}
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 underline transition-colors duration-200"
                        >
                            {link}
                        </a>
                    )}
                    {after && <span> {after}</span>}
                </span>
            </li>
        );
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 80) return 'bg-green-500';
        if (percentage >= 50) return 'bg-blue-500';
        if (percentage >= 20) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const handleTaskUpdate = async () => {
        try {
            setSaving(true);
            const updatedTaskTrack = todaysTopic.task.map((t, i) => completedTasks.has(i));
            const res = await updateUserTasks({ taskTrackArr: updatedTaskTrack });
            if (res.status === 200) {
                showPopup('Task Updated Successfully', 'success');
            } else {
                showPopup('Operation failed please try again', 'error');
            }
        } catch (err) {
            console.log('Error while handling task update', err);
            showPopup('Operation failed please try again', 'error');
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="text-center py-8">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to load task</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!todaysTopic) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Task for Today</h3>
                    <p className="text-gray-600">Enjoy your day off! Check back tomorrow for new tasks.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{todaysTopic.name}</h2>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Today's Task • {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-gray-600 mb-1">Progress</div>
                        <div className="text-2xl font-bold text-indigo-600">{progress}%</div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full ${getProgressColor(progress)} transition-all duration-300`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                    {todaysTopic.detail}
                </p>

                {todaysTopic.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {todaysTopic.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Task Steps
                    </h3>
                    <span className="text-sm text-gray-500">
                        {completedTasks.size} of {todaysTopic.task.length} completed
                    </span>
                </div>

                <div className="space-y-4">
                    {todaysTopic.task.map((step, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-lg border transition-all duration-200 ${completedTasks.has(i)
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50 border-gray-200 hover:border-indigo-200'
                                }`}
                        >
                            {highlightBoldText(step, i)}
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button 
                            className={`flex items-center justify-center bg-indigo-600 text-white px-8 text-lg py-2 rounded mt-3 cursor-pointer transition-all duration-200 ${
                                saving ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-700'
                            }`}
                            onClick={handleTaskUpdate}
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {todaysTopic.resources?.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                        Additional Resources
                    </h3>
                    <ul className="space-y-3">
                        {todaysTopic.resources.map((resource, index) => formatResource(resource, index))}
                    </ul>
                </div>
            )}

            {progress === 100 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-pulse">
                    <div className="text-green-600 mb-3">
                        <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-600">You've completed all tasks for today. Great job!</p>
                </div>
            )}
        </div>
    );
}