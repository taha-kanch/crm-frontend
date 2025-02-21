"use client";

import React from "react";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}