'use client'

import React, { useEffect, useState } from 'react'
import { usePopupMessageContext } from '../contexts/hooks/popupmessagecontexthook'
import { deleteAccount, getUser, getUserTasks } from '@/services/userServices'
import { useRouter } from 'next/navigation'

export default function DeleteAccount() {
    const [isConfirming, setIsConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [confirmationText, setConfirmationText] = useState('')
    const { showPopup } = usePopupMessageContext();
    const [ userTasks, setUserTasks ] = useState([]);
    const [ activeDays, setActiveDays ] = useState(0);
    const router = useRouter();
    useEffect(() => {
        async function getStatsSummary() {
            try {
                const userTask = await getUserTasks();
                setUserTasks(Object.values(userTask.data.userTasks.tasks));

                const userData = await getUser();

                const activeDays = Math.floor((new Date().getTime() - new Date(userData.createdAt).getTime())/(1000 * 60 * 60 * 24));

                setActiveDays(activeDays);
            } catch(err) {

            }
        }

        getStatsSummary();
    }, []);

    const tasksCompleted = userTasks.length ? userTasks.filter(t => !t.taskTrack.includes(false)).length : 0;
    let streak = 0;

    if(userTasks.length) {
        for(let i = userTasks.length; i >= 0; i--) {
            if(userTasks[i] && userTasks[i].taskTrack.includes(false)) break;
            streak++;
        }
    }

    const handleDeleteAccount = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return
        }

        if (confirmationText.toLowerCase() !== 'delete my account') {
            showPopup("Please type 'delete my account' to confirm", "error");
            return;
        }

        setIsDeleting(true);
        try {
            const res = await deleteAccount();
            if (res.status >= 200 && res.status <= 299) {
                showPopup("Account deleted successfully", "success");
                router.push('/');
            } else {
                showPopup("Operation failed. Please try again.", "error");
                setIsDeleting(false);
            }
        } catch (err) {
            showPopup("Operation failed. Please try again.", "error");
            setIsDeleting(false);
        }
    }

    const handleCancel = () => {
        setIsConfirming(false);
        setConfirmationText('');
    }

    return (
        <section className="bg-white rounded-xl shadow-lg p-6 border border-red-200 hover:shadow-md transition-shadow duration-300">
            <div className="space-y-6">
                <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Delete Account</h2>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-sm font-medium text-red-800">This action cannot be undone</h3>
                            <p className="text-sm text-red-600 mt-1">
                                All your data, progress, and account information will be permanently deleted.
                            </p>
                        </div>
                    </div>
                </div>

                {!isConfirming && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">You'll lose:</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-indigo-600">{tasksCompleted}</div>
                                <div className="text-xs text-gray-500">Tasks Completed</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-indigo-600">{activeDays}</div>
                                <div className="text-xs text-gray-500">Days Active</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-indigo-600">{streak}</div>
                                <div className="text-xs text-gray-500">Day Streak</div>
                            </div>
                        </div>
                    </div>
                )}

                {isConfirming ? (
                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-yellow-700">
                                    To confirm deletion, type <span className="font-mono font-bold">delete my account</span> below
                                </p>
                            </div>
                        </div>

                        <input
                            type="text"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            placeholder="Type 'delete my account'"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                            autoFocus
                        />

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting || confirmationText.toLowerCase() !== 'delete my account'}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center
                                    ${isDeleting || confirmationText.toLowerCase() !== 'delete my account'
                                        ? 'bg-red-300 text-white cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                                    }`}
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Deleting...
                                    </>
                                ) : (
                                    'Permanently Delete Account'
                                )}
                            </button>

                            <button
                                onClick={handleCancel}
                                disabled={isDeleting}
                                className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                            We're sorry to see you go. Deleting your account will remove all your data, progress, and learning history permanently.
                        </p>

                        <button
                            onClick={handleDeleteAccount}
                            className="w-full px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg border border-red-200 transition-colors duration-200 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete My Account
                        </button>
                    </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        Need help or have questions?{' '}
                        <button className="text-indigo-600 hover:text-indigo-800 underline">
                            Contact support
                        </button>{' '}
                        before deleting your account.
                    </p>
                </div>
            </div>
        </section>
    )
}