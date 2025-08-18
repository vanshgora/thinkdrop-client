'use client'

import React, { useState } from 'react'
import { usePopupMessageContext } from '../contexts/hooks/popupmessagecontexthook'
import { deleteAccount } from '@/services/userServices'
import { useRouter } from 'next/navigation'

export default function DeleteAccount() {
    const [isConfirming, setIsConfirming] = useState(false)
    const { showPopup } = usePopupMessageContext()

    const router = useRouter();

    const handleDeleteAccount = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return
        }

        try {
            const res = await deleteAccount();
            if (res.status >= 200 && res.status <= 200) {
                showPopup("Account deleted successfully", "success");
                router.push('/');
            } else {
                showPopup("Opereation failed please try again", "error");
            }
        } catch (err) {
            showPopup("Opereation failed please try again", "error");
        }
    }

    return (
        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Delete Account</h2>

                <div className="space-y-3">
                    <p className="text-gray-600 italic">
                        Are you sure you want to lose your daily opportunity to learn something new?
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDeleteAccount}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${isConfirming
                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-md transform hover:scale-105 transition-transform'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                            }`}
                    >
                        {isConfirming ? 'Confirm Permanent Deletion' : 'Delete Account'}
                    </button>

                    {isConfirming && (
                        <button
                            onClick={() => setIsConfirming(false)}
                            className="px-4 py-2 rounded-lg font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}