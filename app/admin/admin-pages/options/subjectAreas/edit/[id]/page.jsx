"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/options/subjectAreas/EditDetails';
import { useRouter } from 'next/navigation';

const EditSubjectAreaDetailsPage = ({ params }) => {
    const [subjectArea, setSubjectArea] = useState(null);
    const [editedSubjectArea, setEditedSubjectArea] = useState({ ...subjectArea });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchSubjectArea = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/subjectAreas/admin/${params.id}`, {
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
                setSubjectArea(data);

            } catch (error) {
                const data = await response.json();
                setErrorMessage(`Failed to fetch Subject Area. ${data.message} || ${error}`);
            }
        };

        fetchSubjectArea();
    }, [params.id, token]);

    const updateSubjectArea = async (updatedSubjectArea) => {
        try {
            const response = await fetch(`${URL}/api/subjectAreas/admin/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedSubjectArea),
            });

            const data = await response.json();

            if (response.ok) {
                // Subject Area updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/subjectAreas/${params.id}`);
            } else {
                // Error updating Subject Area
                setErrorMessage(data.message);
            }

        } catch (error) {
            const data = await response.json();
            setErrorMessage(`Failed to update Subject Area. ${data.message} || ${error}`);
        }
    };

    const handleViewSubjectArea = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/subjectAreas/${id}`);
    };

    const handleInputChange = (e) => {
        setEditedSubjectArea({
            ...editedSubjectArea,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateSubjectArea(editedSubjectArea);
        } catch (error) {
            setErrorMessage(`Failed to update Subject Area. ${error.message}`);
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
                subjectArea={ subjectArea }
                editedSubjectArea={ editedSubjectArea }
                isLoading={ isLoading }
                handleViewSubjectArea={ handleViewSubjectArea }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditSubjectAreaDetailsPage;
