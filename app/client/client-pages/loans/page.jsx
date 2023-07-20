"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import LoanTable from "@components/client/loans/LoanTable";

const LoanTablePage = () => {
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
                        setErrorMessage(`An error occurred while fetching loans.`);
                        router.push("/client/client-pages"); // Redirect to client dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/client/client-pages"); // Redirect to client dashboard
                    }
                }

                const data = await response.json();
                setLoans(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Loans. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoans();
    }, [token]);

    const handleViewLoan = (id) => {
        setIsLoading(true);
        router.push(`/client/client-pages/loans/${id}`);
    };

    const handleBookCatalogue = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/books/catalogue`);
    };

    const handleReturnedList = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/loans/returned`);
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
            <LoanTable
                loans={ loans }
                handleViewLoan={ handleViewLoan }
                handleBookCatalogue={ handleBookCatalogue }
                handleReturnedList={ handleReturnedList }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default LoanTablePage;
