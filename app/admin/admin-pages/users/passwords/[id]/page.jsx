"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import PasswordDetails from "@components/admin/users/passwords/PasswordDetails";

const PasswordDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [password, setPassword] = useState(null);
    const [editedPassword, setEditedPassword] = useState({ ...password });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPassword = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/users/admin/passwords/${params.id}`, {
                    method: "GET",
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
                setPassword(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Change Password. ${error.message}`);
            }
        };

        fetchPassword();
    }, [params.id, token]);

    const updatePassword = async (updatedPassword) => {
        try {
            const response = await fetch(`${URL}/api/users/admin/${password.userId._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPassword),
            });

            const data = await response.json();

            if (response.ok) {
                // User updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/users/passwords`);
            } else {
                // Error updating User
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to Update User's Password. ${error.message}`);
        }
    };

    const handlePasswordList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/users/passwords`);
    };

    const handleInputChange = (e) => {
        setEditedPassword({
            ...editedPassword,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updatePassword(editedPassword);
        } catch (error) {
            setErrorMessage(`Failed to update Password. ${error.message}`);
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
            <PasswordDetails
                password={ password }
                editedPassword={ editedPassword }
                isLoading={ isLoading }
                handlePasswordList={ handlePasswordList }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit }
            />
        </div>
    );
};

export default PasswordDetailsPage;
