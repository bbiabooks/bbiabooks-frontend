"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/loans/EditDetails';
import { useRouter } from 'next/navigation';

const EditLoanDetailsPage = ({ params }) => {
    const [loan, setLoan] = useState(null);
    const [loanStatus, setLoanStatus] = useState(["requested", "rejected", "approved", "returned"]);
    const [bookStatus, setBookStatus] = useState(["okay", "lost", "damaged"]);
    const [editedLoan, setEditedLoan] = useState({ ...loan });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/loans/detail/${params.id}`, {
                    method: 'GET',
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

    const updateLoan = async (updatedLoan) => {
        try {
            const response = await fetch(`${URL}/api/loans/detail/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedLoan),
            });

            const data = await response.json();

            if (response.ok) {
                // Loan updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/loans/${params.id}`);
            } else {
                // Error updating Loan
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Borrowed Book. ${error.message}`);
        }
    };

    const handleViewLoan = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/loans/${id}`);
    };

    const handleInputChange = (e) => {
        setEditedLoan({
            ...editedLoan,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateLoan(editedLoan);
        } catch (error) {
            setErrorMessage(`Error updating Borrowed Book: ${error.message}`);
        }
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
            <EditDetails
                loan={ loan }
                loanStatus={ loanStatus }
                bookStatus={ bookStatus }
                editedLoan={ editedLoan }
                isLoading={ isLoading }
                handleViewLoan={ handleViewLoan }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditLoanDetailsPage;
