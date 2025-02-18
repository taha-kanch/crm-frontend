"use client";
import React from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { LoginValues } from '@/utils/constants';
import { loginSchema } from '@/utils/validations';
import { post, useApi } from '@/helpers/useApi';
import { toast } from 'react-toastify';

export default function LoginPage() {

    const { makeRequest, loading, error, resetError } = useApi();

    const handleSubmit = async (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
        try {
            const response = await makeRequest("auth/login", post, values);
            if(response.error) {
                toast(response.message, {
                    type: "error",
                    autoClose: 2000
                });
            } else {
                toast("Login Successfully", {
                    type: "success",
                    autoClose: 2000
                });
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Navigation */}
            <header className="flex w-full h-[155px] mb-5">
                <div className="flex-[8.5] bg-yellow-300 flex items-center px-10 justify-between" style={{ borderRadius: "0 0 90px 0px" }}>
                    <Link href="/">
                        <img src="/MainLogo2.png" alt="Placeholder" width={120} height={120} />
                    </Link>
                    <nav className="flex w-full items-center justify-between text-lg">
                        <div className="flex space-x-20 justify-center flex-1">
                            <Link href="#" className="px-5 py-2 border border-white border-2 rounded-full font-bold">
                                Home
                            </Link>
                            <Link href="#" className="px-5 py-2 font-bold">About</Link>
                            <Link href="#" className="px-5 py-2 font-bold">Mission</Link>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="/signup" className="px-5 py-2 rounded-full font-bold">Sign Up</Link>
                            <Link href="/login" className="px-5 py-2 bg-white rounded-full font-bold">Login</Link>
                        </div>
                    </nav>
                </div>
                <div className="flex-[1.5] bg-white flex items-center justify-center">
                    <img src="/MainLogo3.png" alt="Placeholder" width={100} height={100} />
                </div>
            </header>

            <main className="container mx-auto px-4 mt-18 flex justify-between items-center">
                <div className="relative w-1/2">
                    <img src="/MainLogo4.png" alt="Left Side Image" className="w-full h-full" />
                </div>
                <div className="w-1/2 px-12 py-10 flex flex-col justify-center items-center">
                    <h2 className="text-5xl font-bold mb-4">Login</h2>
                    <p className="text-lg mb-6">Sign in to continue</p>
                    <Formik
                        validationSchema={loginSchema}
                        initialValues={{ username: "", password: "" }}
                        onSubmit={handleSubmit}
                    >
                        <Form className="w-full max-w-md space-y-1">
                            <div className="space-y-5">
                                <div>
                                    <label className="text-md font-medium">EMAIL</label>
                                    <Field
                                        type="email"
                                        name="username"
                                        className="w-full h-14 mt-1 p-2 border border-gray-300 rounded-lg bg-gray-200"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-md" />
                                </div>
                                <div>
                                    <label className="text-md font-medium text-gray-700">PASSWORD</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="w-full h-14 mt-1 p-2 border border-gray-300 rounded-lg bg-gray-200"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-md" />
                                </div>
                            </div>
                            <div className="text-md text-gray-500 text-start">
                                <Link href="#" className='underline'>Forgot Password?</Link>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-fit px-20 py-3 bg-yellow-300 rounded-lg text-white font-bold mt-4 hover:bg-yellow-400"
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="text-md text-gray-400 mt-6 text-center">
                        Don’t have an account? <Link href='/signup' className="text-yellow-400 underline font-semibold">Sign up</Link>
                    </div>
                </div>
            </main>
        </div>

    );

}