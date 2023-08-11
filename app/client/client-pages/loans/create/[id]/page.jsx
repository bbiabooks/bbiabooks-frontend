"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/client/loans/CreateDetails';

const CreateLoanDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token, userId } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [loanData, setLoanData] = useState({});
    const [book, setBook] = useState([]);
    const [user, setUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBookCatalogue = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/books/catalogue`);
    };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/books/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    setErrorMessage(`An error occurred while fetching book.`);
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setBook(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Book. ${error.message}`);
            }
        };

        fetchBook();
    }, [params.id, token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    setErrorMessage(`An error occurred while fetching user.`);
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setUser(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch User. ${error.message}`);
            }
        };

        fetchUser();
    }, [userId, token]);

    const createLoan = async (loanData) => {
        setIsLoading(true);

        try {
            // Perform the create logic here
            // Example: make a POST request to create a new loan
            const response = await fetch(`${URL}/api/loans`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(loanData),
            });

            const data = await response.json();

            if (response.ok) {
                // Loan created successfully
                setSuccessMessage(data.message + '. Please click the "VIEW" button for the notice.');
                router.push(`/client/client-pages/loans`);
            } else {
                // Error creating Loan
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to creating Borrow. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createLoan(loanData);
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
            <CreateDetails
                book={ book }
                user={ user }
                loanData={ loanData }
                isLoading={ isLoading }
                handleSubmit={ handleSubmit }
                handleBookCatalogue={ handleBookCatalogue }
            />
        </div>
    );
};

export default CreateLoanDetailsPage;
