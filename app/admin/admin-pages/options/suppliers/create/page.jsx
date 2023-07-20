"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/admin/options/suppliers/CreateDetails';

const CreateSupplierDetailsPage = () => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [supplierData, setSupplierData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSupplierList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/suppliers`);
    };

    const handleInputChange = (e) => {
        setSupplierData({
            ...supplierData,
            [e.target.name]: e.target.value,
        });
    };

    const createSupplier = async (supplierData) => {
        setIsLoading(true);

        try {
            // Perform the create logic here
            // Example: make a POST request to create a new supplier
            const response = await fetch(`${URL}/api/suppliers/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(supplierData),
            });

            const data = await response.json();

            if (response.ok) {
                // Supplier created successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/suppliers`);
            } else {
                // Error creating Supplier
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to create Supplier. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createSupplier(supplierData);
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
                supplierData={ supplierData }
                isLoading={ isLoading }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit }
                handleSupplierList={ handleSupplierList }
            />
        </div>
    );
};

export default CreateSupplierDetailsPage;
