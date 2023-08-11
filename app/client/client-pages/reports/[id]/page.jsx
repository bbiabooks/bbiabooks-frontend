"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import ReportDetails from "@components/client/reports/ReportDetails";

const ReportDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/reports/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    setErrorMessage(`An error occurred while fetching report.`);
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setReport(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Activities. ${error.message}`);
            }
        };

        fetchReport();
    }, [params.id, token]);

    const handleViewHome = () => {
        setIsLoading(true);
        router.push(`/client/client-pages`);
    };

    // Effect to automatically remove the error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const errorTimer = setTimeout(() => {
                setErrorMessage(null);
            }, 5000);

            return () => clearTimeout(errorTimer);
        }
    }, [errorMessage]);

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <ReportDetails
                report={ report }
                isLoading={ isLoading }
                handleViewHome={ handleViewHome }
            />
        </div>
    );
};

export default ReportDetailsPage;
