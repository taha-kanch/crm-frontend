"use client";
import { useRouter } from "next/navigation";

export default function SubscriptionCancelPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Payment Cancelled</h1>
                <p className="mt-4 text-lg">You have canceled the subscription payment.</p>
                <button
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg"
                    onClick={() => router.push("/subscription")}
                >
                    Go Back to Plans
                </button>
            </div>
        </main>
    );
}
