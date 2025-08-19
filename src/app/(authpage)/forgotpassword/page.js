'use client';
import { forgotPasswordService, setNewPassword } from '@/services/authServices';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            email: "",
            otp: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const password = watch("password");

    const handleGetOTP = async (data) => {
        try {
            setIsLoading(true);
            data.email = data.email.toLowerCase();
            const res = await forgotPasswordService(data);

            setStep(2);
            setSubmitMessage("OTP sent to your email!");
            setIsError(false);
        } catch (errRes) {
            console.log("Error while submitting", errRes);
            setIsError(true);

            if (errRes.status === 404) {
                setSubmitMessage("❌ Unauthorized email");
            } else {
                setSubmitMessage("❌ Something went wrong. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (data) => {
        try {
            setIsLoading(true);
            const res = await setNewPassword({
                password: data.password,
                otp: data.otp
            });

            setStep(3);
            setSubmitMessage("Password changed successfully!");
            setIsError(false);
        } catch (errRes) {
            console.log("Error while verifying OTP", errRes);
            setIsError(true);
            setSubmitMessage("❌ Operation failed. Please try after some time.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(step === 2 ? handlePasswordReset : handleGetOTP)}>
                {step === 1 && (
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
                )}

                {step === 2 && (
                    <>
                        <div className="auth-form-group">
                            <div>
                                <label htmlFor="password">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be minimum 8 chars long"
                                        },
                                    })}
                                    placeholder="Enter New Password"
                                    maxLength={8}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => <p className="error-text">{message}</p>}
                                />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    {...register("confirmpassword", {
                                        required: "Password is required",
                                        validate: (value) => value === password || "Passwords do not match"
                                    })}
                                    placeholder="Confirm Your Password"
                                    maxLength={8}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="confirmPassword"
                                    render={({ message }) => <p className="error-text">{message}</p>}
                                />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="otp">OTP (6 digits)</label>
                                <input
                                    type="text"
                                    id="otp"
                                    {...register("otp", {
                                        required: "OTP is required",
                                        minLength: {
                                            value: 6,
                                            message: "OTP must be 6 characters"
                                        },
                                        maxLength: {
                                            value: 6,
                                            message: "OTP must be 6 characters"
                                        },
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "OTP must contain only numbers"
                                        }
                                    })}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="otp"
                                    render={({ message }) => <p className="error-text">{message}</p>}
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* {step === 3 && (
                    <div className="auth-success-message">
                        <p>{submitMessage}</p>
                        <a href="/login" className="auth-link">Back to Login</a>
                    </div>
                )} */}

                {(step === 1 || step === 2) && (
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
                                {step === 1 ? 'Sending OTP...' : 'Verifying...'}
                            </div>
                        ) : (
                            step === 1 ? 'Get OTP' : 'Reset'
                        )}
                    </button>
                )}

                {submitMessage && (
                    <div className={`auth-message ${isError ? 'auth-error-message' : 'auth-success-message'}`}>
                        {submitMessage}
                    </div>
                )}
            </form>

            <footer className="auth-footer">
                {(step === 3) ? 'Got new password?, now ' : 'Remember your password?'} <a onClick={() => router.push('/login')} className="auth-link">Login here</a>
            </footer>
        </div>
    );
}