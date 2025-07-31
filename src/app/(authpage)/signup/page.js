'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './signup.css';
import { signupService } from '@/services/authServices';
import { useRouter } from 'next/navigation';
import { timeTagMap } from '@/utils/data';

export default function SignUp() {
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            preferredTime: '',
            allCheck: false
        }
    });

    const [isSignUpSuccessfull, setsSignUpSuccessfull] = useState(-1);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            delete data.confirmPassword;
            delete data.allCheck;

            data.name = data.name.toLowerCase();
            data.email = data.email.toLowerCase();

            setIsLoading(true);
            const res = await signupService(data);

            if (res.status === 200) {
                setsSignUpSuccessfull(1);
                setSubmitMessage("🎉 Welcome! Your first challenge arrives tomorrow.");
                router.push('/login');
            }

        } catch (errRes) {
            console.log("Error while submitting", errRes);

            setsSignUpSuccessfull(0);

            switch (errRes.status) {
                case 409:
                    setSubmitMessage("❌ Email already exsists.");
                    break;
                case 500:
                    setSubmitMessage("❌ Something wents wrong try again later.");
                    break;
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setsSignUpSuccessfull(-1);
            }, 3000);
        }
    };

    const password = watch("password");

    return (
        <>
            <form id="subscribeForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        placeholder="Your name"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                </div>

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
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                        })}
                        placeholder="Create password"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                </div>


                <div className="auth-form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === password || "Passwords do not match"
                        })}
                        placeholder="Confirm password"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="confirmPassword"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                </div>

                <div className="auth-form-group">
                    <label htmlFor="preferredTime">Daily Challenge Time</label>
                    <select
                        id="preferredTime"
                        defaultValue=""
                        {...register("preferredTime", {
                            required: "Preferred Time is required"
                        })}
                    >
                        <option value="">Select your preferred time</option>

                        {Object.keys(timeTagMap).map((key) => {
                            const timeArr = key.split(":");
                            let hours = Number(timeArr[0]) % 12;
                            if(hours === 0) hours = 12;
                            const minutes = timeArr[1];

                            return (<option value={key} key={key}>{hours}:{minutes} {timeArr[0] >= 12 ? " PM" : " AM"}  - {timeTagMap[key]}</option>)
                        })}
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="preferredTime"
                        render={({ message }) => <p className="error-text">{message}</p>}
                    />
                </div>

                <div className="auth-checkbox-label">
                    <input
                        type="checkbox"
                        id="terms"
                        className="auth-checkbox"
                        {...register("allCheck", {
                            required: "You must accept the terms"
                        })}
                    />
                    <label htmlFor="terms">
                        I agree to the <a className="auth-link">Terms</a> and <a className="auth-link">Privacy Policy</a>
                    </label>
                    <div>
                        <ErrorMessage
                            errors={errors}
                            name="allCheck"
                            render={({ message }) => <p className="error-text">{message}</p>}
                        />
                    </div>
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
                            Creating Account...
                        </div>
                    ) : (
                        "Create Account & Start Learning"
                    )}
                </button>

                <div className={`auth-message auth-${isSignUpSuccessfull === 0 ? 'error' : (isSignUpSuccessfull === 1 && 'success')}-message`}>
                    {submitMessage}
                </div>

            </form>

            <footer className="auth-footer">
                Already have an account? <a href="/login">Log in</a>
            </footer>
        </>
    );
}