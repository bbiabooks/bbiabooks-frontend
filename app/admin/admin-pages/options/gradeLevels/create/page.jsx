"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/admin/options/gradeLevels/CreateDetails';

const CreateGradeLevelDetailsPage = () => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [gradeLevelData, setgradeLevelData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleGradeLevelList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/gradeLevels`);
    };

    const handleInputChange = (e) => {
        setgradeLevelData({
            ...gradeLevelData,
            [e.target.name]: e.target.value,
        });
    };

    const createGradeLevel = async (gradeLevelData) => {
        setIsLoading(true);

        try {
            // Perform the create logic here
            // Example: make a POST request to create a new gradeLevel
            const response = await fetch(`${URL}/api/gradeLevels/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(gradeLevelData),
            });

            const data = await response.json();

            if (response.ok) {
                // Grade Level created successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/gradeLevels`);
            } else {
                // Error creating Grade Level
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to create Grade Level. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createGradeLevel(gradeLevelData);
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
                gradeLevelData={ gradeLevelData }
                isLoading={ isLoading }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit }
                handleGradeLevelList={ handleGradeLevelList }
            />
        </div>
    );
};

export default CreateGradeLevelDetailsPage;
