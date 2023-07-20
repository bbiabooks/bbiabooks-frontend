"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/options/gradeLevels/EditDetails';
import { useRouter } from 'next/navigation';

const EditGradeLevelDetailsPage = ({ params }) => {
    const [gradeLevel, setGradeLevel] = useState(null);
    const [editedGradeLevel, setEditedGradeLevel] = useState({ ...gradeLevel });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchGradeLevel = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/gradeLevels/admin/${params.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setGradeLevel(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Grade Level. ${error.message}`);
            }
        };

        fetchGradeLevel();
    }, [params.id, token]);

    const updateGradeLevel = async (updatedGradeLevel) => {
        try {
            const response = await fetch(`http://localhost:5000/api/gradeLevels/admin/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedGradeLevel),
            });

            const data = await response.json();

            if (response.ok) {
                // Grade Level updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/gradeLevels/${params.id}`);
            } else {
                // Error updating Grade Level
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Grade Level. ${error.message}`);
        }
    };

    const handleViewGradeLevel = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/gradeLevels/${id}`);
    };

    const handleInputChange = (e) => {
        setEditedGradeLevel({
            ...editedGradeLevel,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateGradeLevel(editedGradeLevel);
        } catch (error) {
            setErrorMessage(`Error updating Grade Level: ${error.message}`);
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
                gradeLevel={ gradeLevel }
                editedGradeLevel={ editedGradeLevel }
                isLoading={ isLoading }
                handleViewGradeLevel={ handleViewGradeLevel }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditGradeLevelDetailsPage;
