"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/options/suppliers/EditDetails';
import { useRouter } from 'next/navigation';

const EditSupplierDetailsPage = ({ params }) => {
    const [supplier, setSupplier] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState({ ...supplier });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/suppliers/admin/${params.id}`, {
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
                setSupplier(data);

            } catch (error) {
                setErrorMessage(`Failed to delete Supplier. ${error.message}`);
            }
        };

        fetchSupplier();
    }, [params.id, token]);

    const updateSupplier = async (updatedSupplier) => {
        try {
            const response = await fetch(`${URL}/api/suppliers/admin/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedSupplier),
            });

            const data = await response.json();

            if (response.ok) {
                // Supplier updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/suppliers/${params.id}`);
            } else {
                // Error updating Supplier
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Supplier. ${error.message}`);
        }
    };

    const handleViewSupplier = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/suppliers/${id}`);
    };

    const handleInputChange = (e) => {
        setEditedSupplier({
            ...editedSupplier,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateSupplier(editedSupplier);
        } catch (error) {
            setErrorMessage(`Error updating Supplier: ${error.message}`);
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
                supplier={ supplier }
                editedSupplier={ editedSupplier }
                isLoading={ isLoading }
                handleViewSupplier={ handleViewSupplier }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditSupplierDetailsPage;
