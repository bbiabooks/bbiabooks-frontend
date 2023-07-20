"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/admin/options/branches/CreateDetails';

const CreateBranchDetailsPage = () => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [branchData, setBranchData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBranchList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/branches`);
    };

    const handleInputChange = (e) => {
        setBranchData({
            ...branchData,
            [e.target.name]: e.target.value,
        });
    };

    const createBranch = async (branchData) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${URL}/api/branches/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(branchData),
            });

            const data = await response.json();

            if (response.ok) {
                // Branch created successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/branches`);
            } else {
                // Error creating Branch
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to create Branch. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createBranch(branchData);
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
                branchData={ branchData }
                isLoading={ isLoading }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit }
                handleBranchList={ handleBranchList }
            />
        </div>
    );
};

export default CreateBranchDetailsPage;
