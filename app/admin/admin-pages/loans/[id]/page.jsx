"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import LoanDetails from "@components/admin/loans/LoanDetails";

const LoanDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token, userKey } = useAuthContext();
    const [loan, setLoan] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/loans/detail/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setLoan(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Borrows. ${error.message}`);
            }
        };

        fetchLoan();
    }, [params.id, token, userKey]);

    const handleUnauthorizedAction = () => {
        const warningMessage = `You are unauthorized to make this action as "${userKey}".`;
        const confirmMessage = "FOR ANY CHANGE YOU WISHES, PLEASE CONTACT THE ADMIN IN CHARGE.";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleEditLoan = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/loans/edit/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleDeleteLoan = () => {
        if (userKey === "Admin") {
            const warningMessage = `DELETING "${loan._id}" . . .`;
            const confirmMessage = "Are you sure you want to delete this Borrowed Book?";
            setWarningMessage(warningMessage);
            setConfirmMessage(confirmMessage);
            setIsConfirmationModalOpen(true);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleConfirmDelete = async () => {
        if (userKey === "Admin") {
            setIsConfirmationModalOpen(false);
            setIsDeleting(true);

            try {
                const response = await fetch(`${URL}/api/loans/detail/${loan._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    // Loan deleted successfully
                    setSuccessMessage(data.message);
                    router.push(`/admin/admin-pages/loans`);
                } else {
                    // Error deleting Loan
                    setErrorMessage(data.message);
                }

            } catch (error) {
                setErrorMessage(`Failed to delete Borrowed Book. ${error.message}`);
            } finally {
                setIsDeleting(false);
            }
        }
        else {
            setIsConfirmationModalOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleLoanList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/loans`);
    };

    // Effect to automatically remove the success/error message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const successTimer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);

            return () => clearTimeout(successTimer);
        }

        if (errorMessage) {
            const errorTimer = setTimeout(() => {
                setErrorMessage(null);
            }, 5000);

            return () => clearTimeout(errorTimer);
        }
    }, [successMessage, errorMessage]);

    return (
        <div>
            { successMessage && (
                <div className="bg-green-200 text-green-800 py-2 px-4 mb-4 rounded">
                    { successMessage }
                </div>
            ) }
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <LoanDetails
                loan={ loan }
                isDeleting={ isDeleting }
                isLoading={ isLoading }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleEditLoan={ handleEditLoan }
                handleDeleteLoan={ handleDeleteLoan }
                handleConfirmDelete={ handleConfirmDelete }
                handleCancelDelete={ handleCancelDelete }
                handleLoanList={ handleLoanList }
            />
        </div>
    );
};

export default LoanDetailsPage;
