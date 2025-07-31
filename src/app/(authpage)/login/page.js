'use client';
import { loginService } from '@/services/authServices';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LogIn() {

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(-1);
    const [submitMessage, setSubmitMessage] = useState('');

    const onSubmit = async (data) => {
        try {
            data.email = data.email.toLowerCase();
            setIsLoading(true);
            const res = await loginService(data);

            if (res.status === 200) {
                setIsLoginSuccessfull(1);
                setSubmitMessage(" Welcome! Again.");
                router.push("/dashboard");
            }
        } catch (errRes) {
            console.log("Error while submitting", errRes);

            setIsLoginSuccessfull(0);

            switch (errRes.status) {
                case 404:
                    setSubmitMessage("❌ Email not exsists.");
                    break;
                case 401:
                    setSubmitMessage("❌ Invaid Credentials.");
                    break;
                case 500:
                    setSubmitMessage("❌ Something wents wrong try again later.");
                    break;
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setIsLoginSuccessfull(-1);
            }, 3000);
        }
    }

    return (
        <>

            <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>

                <div className="auth-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        placeholder="your@email.com"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                </div>

                <div className="auth-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                        })}
                        placeholder="Your password"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                </div>

                 <button
                    type="submit"
                    className="auth-subscribe-btn"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging In...
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>

                <div className={`auth-message auth-${isLoginSuccessfull === 0 ? 'error' : (isLoginSuccessfull === 1 && 'success')}-message`}>
                    {submitMessage}
                </div>
            </form>


            <footer className="auth-footer">
                Want to start a new journey? <a href="/signup">Create Account</a>
            </footer>
        </>
    )
}
