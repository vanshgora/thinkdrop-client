'use client';
import { loginService } from '@/services/authServices';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function LogIn() {

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });


    let e;

    const onSubmit = async (data) => {
        loginService(data);
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

                <button type="submit" className="auth-subscribe-btn">
                    Login
                </button>

                <div className="auth-message auth-success-message" id="successMessage">
                    🎉 Welcome! Again.
                </div>

                <div className="auth-message auth-error-message" id="errorMessage">
                    ❌ Please check your information and try again.
                </div>
            </form>


            <footer className="auth-footer">
                Want to start a new journey? <a href="/signup">Create Account</a>
            </footer>
        </>
    )
}
