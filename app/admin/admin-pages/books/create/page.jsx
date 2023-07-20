"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/admin/books/CreateDetails';

const CreateBookDetailsPage = () => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [subjectAreas, setSubjectAreas] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [bookData, setBookData] = useState({ coverImage: null });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBookList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/books`);
    };

    const handleInputChange = (e) => {
        if (e.target.name === "coverImage" && e.target.files.length > 0) {
            setBookData({
                ...bookData,
                coverImage: e.target.files[0],
            });
        } else {
            setBookData({
                ...bookData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setBookData({
                ...bookData,
                coverImage: e.target.files[0],
            });
        }
    };

    const createBook = async (bookData) => {
        setIsLoading(true);

        try {
            // Create form data
            const formData = new FormData();
            for (const key in bookData) {
                formData.append(key, bookData[key]);
            }

            // Perform the create logic here
            // Example: make a POST request to create a new book
            const response = await fetch(`${URL}/api/books/detail`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Book created successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/books`);
            } else {
                // Error creating Book
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to create Book. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch(
                    `${URL}/api/suppliers/admin`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setSuppliers(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Suppliers. ${error.message}`);
            }
        };

        fetchSuppliers();
    }, [token]);

    useEffect(() => {
        const fetchSubjectAreas = async () => {
            try {
                const response = await fetch(`${URL}/api/subjectAreas/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setSubjectAreas(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Subject Areas. ${error.message}`);
            }
        };

        fetchSubjectAreas();
    }, [token]);

    useEffect(() => {
        const fetchGradeLevels = async () => {
            try {
                const response = await fetch(`${URL}/api/gradeLevels/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setGradeLevels(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Grade Levels. ${error.message}`);
            }
        };

        fetchGradeLevels();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        createBook(bookData);
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
                bookData={ bookData }
                isLoading={ isLoading }
                suppliers={ suppliers }
                subjectAreas={ subjectAreas }
                gradeLevels={ gradeLevels }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit }
                handleBookList={ handleBookList }
            />
        </div>
    );
};

export default CreateBookDetailsPage;
