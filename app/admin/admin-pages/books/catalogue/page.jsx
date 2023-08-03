"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import BookCatalogue from "@components/admin/books/BookCatalogue";

const BookCataloguePage = () => {
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const { token, userKey } = useAuthContext(); // Assuming you have a context to access the token
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        // Fetch all books from the backend API
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${URL}/api/books`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching catalogue.`);
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    }
                }

                const data = await response.json();
                setBooks(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Catalogue. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [token, userKey]);

    const handleUnauthorizedAction = () => {
        const warningMessage = `You are unauthorized to make this action as "${userKey}" . . .`;
        const confirmMessage = "FOR ANY CHANGE YOU WISHES, PLEASE CONTACT THE ADMIN IN CHARGE.";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirm = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleViewBook = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/books/catalogue/${id}`);
    };

    const handleOrderBook = (id) => {
        if (userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/orders/create/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleBorrowBook = (id) => {
        if (userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/loans/create/${id}`);
        } else {
            handleUnauthorizedAction();
        }
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
            <BookCatalogue
                books={ books }
                handleViewBook={ handleViewBook }
                handleOrderBook={ handleOrderBook }
                handleBorrowBook={ handleBorrowBook }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default BookCataloguePage;
