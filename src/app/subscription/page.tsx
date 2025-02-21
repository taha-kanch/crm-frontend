"use client";
import { SubscriptionService } from "@/api/Services/SubscriptionService";
import { SubscriptionPlan } from "@/utils/constants";
import React from "react";
import { toast } from "react-toastify";

const bgColor = ['bg-white', 'bg-primary'];
const buttonBgColor = ['bg-primary', 'bg-white'];

const subscriptionService = new SubscriptionService();

const SubscriptionPage = () => {

    const [subscriptionPlans, setSubscriptionPlans] = React.useState<SubscriptionPlan[]>([]);

    React.useEffect(() => {
        fetchSubscriptionPlans();
    }, []);

    const fetchSubscriptionPlans = async () => {
        const response = await subscriptionService.getSubscriptions();
        if (!response.isOk) {
            toast(response.data.message, {
                type: "error",
                autoClose: 2000,
            });
        }
        else {
            const subscriptionData = response.data.map((item: SubscriptionPlan) => {
                return {
                    ...item,
                    features: item.description ? item.description.split(',') : [],
                    pricePerMonth: item.subscriptionType.typeName == "Yearly" ? item.price / 12 : item.price
                }
            })
            setSubscriptionPlans(subscriptionData);
        }
    }

    const handleSubscription = async (subscriptionID: number, userID: number, userEmail: string) => {

        const response = await subscriptionService.createStripeCheckoutSession({
            subscriptionID,
            userID,
            userEmail,
        });
        if (!response.isOk) {
            toast(response.data.message, {
                type: "error",
                autoClose: 2000,
            });
        }
        else {
            const { sessionUrl } = response.data;
            if (sessionUrl) {
                window.location.href = sessionUrl;
            }
        }
    };

    return (
        <>
            <main className="min-h-screen py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-black mb-4">
                        CHOOSE YOUR BEST PLAN
                    </h1>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
                        A SIMPLE PRICING TABLE OF OUR SERVICES, A TRANSPARENT GUIDE WITHOUT ADDITIONAL OR HIDDEN CHARGES.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {
                            subscriptionPlans.length > 0 && (
                                subscriptionPlans.map((subscription, idx) => {
                                    const i = idx % 2;
                                    return (
                                        <div className={`${bgColor[i]} rounded-3xl p-8 shadow-lg relative`} key={subscription.id}>
                                            <div className={`${buttonBgColor[i]} text-black font-semibold py-2 px-6 rounded-full inline-block mb-6`}>
                                                {subscription.subscriptionType.typeName}
                                            </div>
                                            <div className="mb-8">
                                                <span className="text-6xl font-bold">${subscription.pricePerMonth}</span>
                                                <span className="text-gray-600 block mt-1">PER MONTH</span>
                                            </div>
                                            <ul className="space-y-4 text-left mb-8">
                                                {
                                                    subscription.features.map((feature, featureIdx) => (
                                                        <li className="flex items-center" key={featureIdx}>
                                                            <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                                                            {feature}
                                                        </li>
                                                    ))
                                                }
                                            </ul>

                                            <button
                                                className={`w-full ${buttonBgColor[i]} text-black font-semibold py-3 rounded-full transition-colors`}
                                                onClick={() => handleSubscription(subscription.id, 1, "info.tahakanch@gmail.com")}
                                            >
                                                GET START
                                            </button>
                                        </div>
                                    )
                                }))
                        }
                    </div>
                </div>
            </main>
        </>
    );

}

export default SubscriptionPage;