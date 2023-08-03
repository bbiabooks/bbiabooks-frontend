"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import HelpAndPolicies from "@components/admin/HelpPolicies";

const HelpAndPoliciesPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { userKey } = useAuthContext();

    // Effect to automatically remove the success/error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const errorTimer = setTimeout(() => {
                setErrorMessage(null);
            }, 5000);

            return () => clearTimeout(errorTimer);
        }
    }, [errorMessage]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <HelpAndPolicies
                isLoading={ isLoading }
                userKey={ userKey }
            />
        </div>
    );
};

export default HelpAndPoliciesPage;
