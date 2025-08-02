'use client';
import { getUser, reSchedule } from "@/services/userServices";
import { timeTagMap } from "@/utils/data";
import { useEffect, useState } from "react";

export default function RescheduleSec() {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [rescheduleTime, setRescheduleTime] = useState("");

    useEffect(() => {
        setUser(getUser());
    }, []);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await reSchedule({ preferredTime: rescheduleTime, email: user.email });
            setUser(res.data.user);
        } catch (error) {
            console.error("Failed to toggle pause:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setRescheduleTime(e.target.value);
    };

    return (
        <section className='bg-white rounded-xl shadow-md p-6 border border-gray-200'>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Challenge Time</h2>
            <div className='update-form'>
                <label htmlFor="preferred-time"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Select preferred time
                </label>
                <select id="preferred-time" name="preferred-time"
                    className="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required value={rescheduleTime} onChange={handleChange}>
                    <option value="">Select your preferred time</option>
                    {Object.keys(timeTagMap).map((key) => {
                        const timeArr = key.split(":");
                        let hours = Number(timeArr[0]) % 12;
                        if (hours === 0) hours = 12;
                        const minutes = timeArr[1];
                        return (<option value={key} key={key}>{hours}:{minutes} {timeArr[0] >= 12 ? " PM" : " AM"}  - {timeTagMap[key]}</option>)
                    })}
                </select>
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className={`cursor-pointer mt-4 w-full text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out
        ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            Updating...
                        </div>
                    ) : (
                        "Update Schedule"
                    )}
                </button>

            </div>
        </section>
    )
}
