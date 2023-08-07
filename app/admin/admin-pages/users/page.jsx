"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import UserTable from "@components/admin/users/UserTable";

const UserTablePage = () => {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        // Fetch all users from the backend API
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${URL}/api/users/table`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching users.`);
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    }
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Users. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [token, userKey]);

    const handleUnauthorizedAction = () => {
        const warningMessage = `You are unauthorized to make this action as "${userKey}" . . .`;
        const confirmMessage = "FOR ANY CHANGE YOU WISHES, PLEASE CONTACT THE ADMIN IN CHARGE.";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirm = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleViewUser = (id) => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/users/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleCreateUser = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/users/create`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleChangePassList = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/users/passwords`);
        } else {
            handleUnauthorizedAction();
        }
    };

    // Effect to automatically remove the error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const errorTimer = setTimeout(() => {
                setErrorMessage(null);
            }, 5000);

            return () => clearTimeout(errorTimer);
        }
    }, [errorMessage]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <UserTable
                users={ users }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
                handleViewUser={ handleViewUser }
                handleCreateUser={ handleCreateUser }
                isLoading={ isLoading }
                handleChangePassList={ handleChangePassList }
            />
        </div>
    );
};

export default UserTablePage;
