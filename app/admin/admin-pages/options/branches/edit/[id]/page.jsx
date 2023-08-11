"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/options/branches/EditDetails';
import { useRouter } from 'next/navigation';

const EditBranchDetailsPage = ({ params }) => {
    const [branch, setBranch] = useState(null);
    const [editedBranch, setEditedBranch] = useState({ ...branch });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/branches/admin/${params.id}`, {
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
                setBranch(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Branch. ${error.message}`);
            }
        };

        fetchBranch();
    }, [params.id, token]);

    const updateBranch = async (updatedBranch) => {
        try {
            const response = await fetch(`${URL}/api/branches/admin/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedBranch),
            });

            const data = await response.json();

            if (response.ok) {
                // Branch updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/branches/${params.id}`);
            } else {
                // Error updating Branch
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Branch. ${error.message}`);
        }
    };

    const handleViewBranch = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/branches/${id}`);
    };

    const handleInputChange = (e) => {
        setEditedBranch({
            ...editedBranch,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateBranch(editedBranch);
        } catch (error) {
            setErrorMessage(`Failed to update Branch. ${error.message}`);
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
                branch={ branch }
                editedBranch={ editedBranch }
                isLoading={ isLoading }
                handleViewBranch={ handleViewBranch }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditBranchDetailsPage;
