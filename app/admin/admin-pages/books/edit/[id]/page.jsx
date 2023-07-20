"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/books/EditDetails';
import { useRouter } from 'next/navigation';

const EditBookDetailsPage = ({ params }) => {
    const [book, setBook] = useState(null);
    const [editedBook, setEditedBook] = useState({ ...book });
    const [isLoading, setIsLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [subjectAreas, setSubjectAreas] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
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

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setBook(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Book. ${error.message}`);
            }
        };

        fetchBook();
    }, [params.id, token]);

    const updateBook = async (updatedBook) => {
        try {
            const formData = new FormData();
            for (const key in updatedBook) {
                formData.append(key, updatedBook[key]);
            }

            const response = await fetch(`${URL}/api/books/detail/${params.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Book updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/books/${params.id}`);
            } else {
                // Error updating Book
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(`Failed to update Book. ${error.message}`);
        }
    };

    const handleViewBook = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/books/${id}`);
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'coverImage') {
            setEditedBook({
                ...editedBook,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setEditedBook({
                ...editedBook,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        setEditedBook({
            ...editedBook,
            [e.target.name]: e.target.files[0],
        });
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

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch(`${URL}/api/suppliers/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
                book={ book }
                editedBook={ editedBook }
                isLoading={ isLoading }
                suppliers={ suppliers }
                subjectAreas={ subjectAreas }
                gradeLevels={ gradeLevels }
                handleViewBook={ handleViewBook }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditBookDetailsPage;
