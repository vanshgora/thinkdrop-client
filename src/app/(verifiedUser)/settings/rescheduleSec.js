'use client';
import { getUser, reSchedule } from "@/services/userServices";
import { timeTagMap } from "@/utils/data";
import { useEffect, useState } from "react";
import { usePopupMessageContext } from "../contexts/hooks/popupmessagecontexthook";

export default function RescheduleSec() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rescheduleTime, setRescheduleTime] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        const userData = getUser();
        setUser(userData);
        setRescheduleTime(userData?.preferredTime || "");
        setCurrentTime(userData?.preferredTime || "");
    }, []);

    const { showPopup } = usePopupMessageContext();

    const handleClick = async () => {
        if (loading || !isDirty) return;
        
        setLoading(true);
        try {
            const res = await reSchedule({ preferredTime: rescheduleTime, email: user.email });
            setUser(res.data.user);
            setCurrentTime(rescheduleTime);
            setIsDirty(false);
            showPopup("Schedule updated successfully! 🎉", "success");
        } catch (error) {
            showPopup("Failed to update schedule. Please try again.", "error");
            console.error("Failed to reschedule:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setRescheduleTime(e.target.value);
        setIsDirty(e.target.value !== currentTime);
    };

    const formatTimeForDisplay = (time) => {
        if (!time) return "Not set";
        const timeArr = time.split(":");
        let hours = Number(timeArr[0]) % 12;
        if (hours === 0) hours = 12;
        const minutes = timeArr[1];
        return `${hours}:${minutes} ${Number(timeArr[0]) >= 12 ? "PM" : "AM"}`;
    };

    const getTimeTagDescription = (time) => {
        return time ? timeTagMap[time] || "Custom time" : "Not set";
    };

    const TimeVisualization = ({ time }) => {
        if (!time) return null;
        
        const timeArr = time.split(":");
        const hours = Number(timeArr[0]);
        const minutes = Number(timeArr[1]);
        const isPM = hours >= 12;
        const displayHours = hours % 12 || 12;
        
        return (
            <div className="flex items-center justify-center mb-4">
                <div className="bg-indigo-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-700">
                        {displayHours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
                        <span className="text-sm font-normal ml-1">{isPM ? "PM" : "AM"}</span>
                    </div>
                    <div className="text-sm text-indigo-600 mt-1">
                        {getTimeTagDescription(time)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className='bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300'>
            <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Update Challenge Time</h2>
            </div>

            {/* Current Time Display */}
            {currentTime && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium text-blue-800">
                            Current schedule: {formatTimeForDisplay(currentTime)} • {getTimeTagDescription(currentTime)}
                        </span>
                    </div>
                </div>
            )}

            <div className='space-y-4'>
                <div>
                    <label htmlFor="preferred-time" className="block text-sm font-medium text-gray-700 mb-2">
                        Select your preferred challenge time
                    </label>
                    <select 
                        id="preferred-time" 
                        name="preferred-time"
                        className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        required 
                        value={rescheduleTime} 
                        onChange={handleChange}
                    >
                        <option value="">Choose a time slot</option>
                        {Object.keys(timeTagMap).map((key) => {
                            const timeArr = key.split(":");
                            let hours = Number(timeArr[0]) % 12;
                            if (hours === 0) hours = 12;
                            const minutes = timeArr[1];
                            return (
                                <option value={key} key={key}>
                                    {hours}:{minutes.padStart(2, '0')} {Number(timeArr[0]) >= 12 ? "PM" : "AM"} • {timeTagMap[key]}
                                </option>
                            );
                        })}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                        This is when you'll receive your daily challenges
                    </p>
                </div>

                {/* Preview of selected time */}
                {rescheduleTime && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Time Preview</h4>
                        <TimeVisualization time={rescheduleTime} />
                    </div>
                )}

                <button
                    onClick={handleClick}
                    disabled={loading || !isDirty}
                    className={`w-full text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center
                        ${loading ? "bg-indigo-400 cursor-not-allowed" : 
                          !isDirty ? "bg-gray-400 cursor-not-allowed" : 
                          "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Updating Schedule...
                        </>
                    ) : (
                        isDirty ? "Update Schedule" : "No Changes Made"
                    )}
                </button>

                {/* Help Text */}
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-yellow-700">
                            Changes will take effect from tomorrow's challenge. Your current schedule remains active for today.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}