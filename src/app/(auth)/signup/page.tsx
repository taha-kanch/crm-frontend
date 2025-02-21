"use client";
import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { SignupValues } from "@/utils/constants";
import { signupSchema } from "@/utils/validations";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthService } from "@/api/Services/AuthService";

const authService = new AuthService();

export default function SignupPage() {
    
    const router = useRouter();

    const handleSubmit = async (
        values: SignupValues,
        { setSubmitting }: FormikHelpers<SignupValues>
    ) => {
        try {
            const response = await authService.signup(values);
            if (!response.isOk) {
                toast(response.data.message, {
                    type: "error",
                    autoClose: 2000,
                });
            } else {
                router.push("/subscription");
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
                            <img
                                src="/MainLogo2.png"
                                alt="Placeholder"
                                width={200}
                            />
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
                                    className="px-5 py-2 bg-white rounded-full font-bold"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 rounded-full font-bold"
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

            {/* Main Content */}
            <main className="container px-4 m-auto flex flex-col items-start justify-center py-16">
                <h2 className="text-6xl font-bold">Create new account</h2>
                <p className="text-black font-semiBold mt-2">
                    Already Registered?{" "}
                    <Link
                        href="/login"
                        className="text-yellow-400 underline font-semibold"
                    >
                        Login
                    </Link>
                </p>
                <Formik
                    validationSchema={signupSchema}
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form className="mt-8 space-y-6 w-full max-w-3xl">
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <label className="block text-sm font-medium">NAME</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="w-full h-14 mt-1 p-2 border border-gray-300 rounded-lg bg-gray-200"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">EMAIL</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full h-14 mt-1 p-2 border border-gray-300 rounded-lg bg-gray-200"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-md"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <label className="block text-sm font-medium">PASSWORD</label>
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
                            <div>
                                <label className="block text-sm font-medium">
                                    CONFIRM PASSWORD
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full h-14 mt-1 p-2 border border-gray-300 rounded-lg bg-gray-200"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-md"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center w-full">
                            <button
                                type="submit"
                                className="w-fit px-20 py-3 bg-yellow-300 rounded-lg text-white font-bold mt-4 hover:bg-yellow-400"
                            >
                                Sign up
                            </button>
                        </div>
                    </Form>
                </Formik>
            </main>
        </div>
    );
}