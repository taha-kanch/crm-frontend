"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { LoginValues } from "@/utils/constants";
import { loginSchema } from "@/utils/validations";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthService } from "@/api/Services/AuthService";

const authService = new AuthService();

export default function LoginPage() {

    const router = useRouter();

    const handleSubmit = async (
        values: LoginValues,
        { setSubmitting }: FormikHelpers<LoginValues>
    ) => {
        try {
            const response = await authService.login(values);
            if (!response.isOk) {
                toast(response.data.message, {
                    type: "error",
                    autoClose: 2000,
                });
            } else {
                if (response.data.user.subscriptionID) {
                    router.push("/");
                } else {
                    router.push("/subscription");
                }
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Navigation */}
            <header className="relative w-full h-[180px] mb-5">
                {/* Background that extends to full width */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-300 from-50% to-white to-50%"
                    style={{ borderRadius: "0 0 90px 0px" }}
                >
                    {/* This creates the yellow background that extends fully */}
                </div>

                {/* Constrained content */}
                <div className="relative flex max-w-[1600px] mx-auto h-full">
                    <div
                        className="flex-[8.5] flex items-center px-10 justify-between bg-yellow-300"
                        style={{ borderRadius: "0 0 90px 0px" }}
                    >
                        <Link href="/">
                            <img src="/MainLogo2.png" alt="Placeholder" width={200} />
                        </Link>
                        <nav className="flex w-full items-center justify-between text-2xl">
                            {/* Centered Navigation Buttons */}
                            <div className="flex space-x-20 justify-center flex-1">
                                <Link
                                    href="#"
                                    className="px-12 py-2 border-[2px] border-white rounded-full font-bold"
                                >
                                    Home
                                </Link>
                                <Link href="#" className="px-12 py-2 font-bold">
                                    About
                                </Link>
                                <Link href="#" className="px-12 py-2 font-bold">
                                    Mission
                                </Link>
                            </div>
                            {/* Right-aligned Sign Up & Login */}
                            <div className="flex space-x-6">
                                <Link
                                    href="/signup"
                                    className="px-5 py-2 rounded-full font-bold"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 bg-white rounded-full font-bold"
                                >
                                    Login
                                </Link>
                            </div>
                        </nav>
                    </div>
                    <div className="flex-[1.5] bg-white flex items-center justify-center">
                        <img
                            src="/MainLogo3.png"
                            alt="Placeholder"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </header>

            <main className="mt-18 flex justify-between items-center">
                <div className="relative w-1/2">
                    <img
                        src="/MainLogo4.png"
                        alt="Left Side Image"
                        className="w-full h-full"
                    />
                </div>
                <div className="w-1/2 px-12 py-10 flex flex-col justify-center items-start">
                    <h2 className="w-full max-w-md  text-5xl font-bold mb-4 text-center">
                        Login
                    </h2>
                    <p className="w-full max-w-md text-center text-lg mb-6">
                        Sign in to continue
                    </p>
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
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="text-red-500 text-md"
                                    />
                                </div>
                                <div>
                                    <label className="text-md font-medium text-gray-700">
                                        PASSWORD
                                    </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="w-full h-14 mt-1 p-2 border border-gray-300 rounded-lg bg-gray-200"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-md"
                                    />
                                </div>
                            </div>
                            <div className="text-md text-gray-500 text-start">
                                <Link href="#" className="underline">
                                    Forgot Password?
                                </Link>
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
                    <div className="w-full text-gray-400 max-w-md text-center mt-5">
                        Don’t have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-yellow-400 underline font-semibold"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}