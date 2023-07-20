"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import UserDetails from "@components/admin/users/UserDetails";

const UserDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/users/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setUser(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch User. ${error.message}`);
            }
        };

        fetchUser();
    }, [params.id, token]);

    const handleEditUser = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/users/edit/${id}`);
    };

    const handleDeleteUser = () => {
        const username = user.username;
        const warningMessage = `DELETING "${username}" . . .`;
        const confirmMessage = "ARE YOU SURE YOU WANT TO DELETE THIS USER?";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsConfirmationModalOpen(false);
        setIsDeleting(true);

        try {
            const response = await fetch(`${URL}/api/users/admin/${user._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                // User deleted successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/users`);
            } else {
                // Error deleting User
                setErrorMessage(data.message);
            }

        } catch (error) {
            const data = await response.json();
            setErrorMessage(`Failed to delete Signups. ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleUserList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/users`);
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
            <UserDetails
                user={ user }
                isDeleting={ isDeleting }
                isLoading={ isLoading }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleEditUser={ handleEditUser }
                handleDeleteUser={ handleDeleteUser }
                handleConfirmDelete={ handleConfirmDelete }
                handleCancelDelete={ handleCancelDelete }
                handleUserList={ handleUserList }
            />
        </div>
    );
};

export default UserDetailsPage;
