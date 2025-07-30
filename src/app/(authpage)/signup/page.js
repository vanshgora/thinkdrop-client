'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './signup.css';
import { signupService } from '@/services/authServices';

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
            preferredTime: '07:30',
            allCheck: false
        }
    });

    const onSubmit = async (data) => {
        signupService(data);
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
                        <option value="">Select preferred time</option>
                        <option value="06:00">6:00 AM - Early Bird</option>
                        <option value="07:00">7:00 AM - Morning Boost</option>
                        <option value="07:30">7:30 AM - Default</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="20:00">8:00 PM - Night Owl</option>
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

                <button type="submit" className="auth-subscribe-btn">
                    Create Account & Start Learning
                </button>

                <div className="auth-message auth-success-message" id="successMessage">
                    🎉 Welcome! Your first challenge arrives tomorrow.
                </div>

                <div className="auth-message auth-error-message" id="errorMessage">
                    ❌ Please check your information and try again.
                </div>
            </form>

            <footer className="auth-footer">
                Already have an account? <a href="/login">Log in</a>
            </footer>
        </>
    );
}