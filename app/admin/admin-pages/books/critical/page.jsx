"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import CriticalTable from "@components/admin/books/CriticalTable";

const CriticalTablePage = () => {
    const [books, setBooks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        // Fetch all books from the backend API
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${URL}/api/books/table`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching books.`);
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    }
                }

                const data = await response.json();
                setBooks(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Book. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [token, userKey]);

    const handleViewBook = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/books/critical/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleEditStock = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/books/restock/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleBookList = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/books`);
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
            <CriticalTable
                books={ books }
                handleViewBook={ handleViewBook }
                handleEditStock={ handleEditStock }
                handleBookList={ handleBookList }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default CriticalTablePage;
