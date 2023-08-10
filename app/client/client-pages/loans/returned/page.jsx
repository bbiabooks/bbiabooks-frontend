"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import ReturnedTable from "@components/client/loans/ReturnedTable";

const ReturnedTablePage = () => {
    const [loans, setLoans] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        // Fetch all loans from the backend API
        const fetchLoans = async () => {
            try {
                const response = await fetch(`${URL}/api/loans`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching borrows.`);
                    } else {
                        setErrorMessage("Something went wrong.");
                    }
                }

                const data = await response.json();
                setLoans(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Borrows. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoans();
    }, [token]);

    const handleViewLoan = (id) => {
        setIsLoading(true);
        router.push(`/client/client-pages/loans/returned/${id}`);
    };

    const handleLoanList = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/loans`);
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
            <ReturnedTable
                loans={ loans }
                handleViewLoan={ handleViewLoan }
                handleLoanList={ handleLoanList }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default ReturnedTablePage;
