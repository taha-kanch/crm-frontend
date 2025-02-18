import React from "react";
import "../styles/globals.css";
import { ReduxProvider } from "@/components/redux-provider";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    {children}
                    <ToastContainer />
                </ReduxProvider>
            </body>
        </html>
    );
}