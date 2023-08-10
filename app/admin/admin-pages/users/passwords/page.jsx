"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import PasswordTable from "@components/admin/users/passwords/PasswordTable";

const PasswordTablePage = () => {
    const [passwords, setPasswords] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // Fetch all branches from the backend API
        const fetchPasswords = async () => {
            try {
                const response = await fetch(`${URL}/api/users/admin/passwords`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching branches.`);
                    } else {
                        setErrorMessage("Something went wrong.");
                    }
                }

                const data = await response.json();
                setPasswords(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Branches. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPasswords();
    }, [token]);

    const handleViewUsers = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/users`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewPassword = (id) => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/users/passwords/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <PasswordTable
                passwords={ passwords }
                handleViewUsers={ handleViewUsers }
                handleViewPassword={ handleViewPassword }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default PasswordTablePage;
