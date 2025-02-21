"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { post, useApi } from "@/helpers/useApi";

export default function SubscriptionSuccessPage() {


    const { makeRequest } = useApi();
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionId) {
            confirmPayment();
        }
    }, [sessionId]);

    const confirmPayment = async () => {
        try {
            const response = await makeRequest("stripe/confirm-payment", post, {
                session_id: sessionId
            });
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                {loading ? (
                    <p className="text-lg">Processing your payment...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <>
                        <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
                        <p className="mt-4 text-lg">Your subscription has been activated.</p>
                        <button
                            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
                            onClick={() => router.push("/")}
                        >
                            Go to Home
                        </button>
                    </>
                )}
            </div>
        </main>
    );
}
