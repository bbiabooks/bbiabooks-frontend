"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import StockDetails from '@components/admin/books/StockDetails';
import { useRouter } from 'next/navigation';

const StockBookDetailsPage = ({ params }) => {
    const [book, setBook] = useState(null);
    const [editedBook, setEditedBook] = useState({ ...book });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/books/detail/${params.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setBook(data);
                setEditedBook((prevEditedBook) => ({
                    ...prevEditedBook,
                    numberOfCopies: data.numberOfCopies,
                }));

            } catch (error) {
                setErrorMessage(`Failed to fetch Book. ${error.message}`);
            }
        };

        fetchBook();
    }, [params.id, token]);

    const updateBook = async (updatedBook) => {
        try {
            const response = await fetch(`${URL}/api/books/detail/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedBook),
            });

            const data = await response.json();

            if (response.ok) {
                // Book updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/books`);
            } else {
                // Error updating Book
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Book. ${error.message}`);
        }
    };

    const handleViewBooks = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/books`);
    };

    const handleInputChange = (name, value) => {
        setEditedBook((prevEditedBook) => ({
            ...prevEditedBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateBook(editedBook);
        } catch (error) {
            setErrorMessage(`Failed to update Book. ${error.message}`);
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
            <StockDetails
                book={ book }
                editedBook={ editedBook }
                isLoading={ isLoading }
                handleViewBooks={ handleViewBooks }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default StockBookDetailsPage;
