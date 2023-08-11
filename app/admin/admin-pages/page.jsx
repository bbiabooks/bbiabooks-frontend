"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import DashboardTabs from "@components/admin/DashboardTabs";

const DashboardPage = () => {
    const [inventory, setInventory] = useState([]);
    const [reports, setReports] = useState([]);
    const [user, setUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const { token, userKey, userId } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        // Fetch all inventory from the backend API
        const fetchInventory = async () => {
            try {
                const response = await fetch(`${URL}/api/reports/inventory`, {
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
                setInventory(data);
            } catch (error) {
                setErrorMessage(`Error fetching Dashboard: ${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, [token, userKey]);

    useEffect(() => {
        // Fetch all reports from the backend API
        const fetchReports = async () => {
            try {
                const response = await fetch(`${URL}/api/reports`, {
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
                setReports(data);
            } catch (error) {
                setErrorMessage(`Error fetching Own History: ${error}`);
            }
        };

        fetchReports();
    }, [token, userKey]);

    useEffect(() => {
        // Fetch all user from the backend API
        const fetchUser = async () => {
            try {
                const response = await fetch(`${URL}/api/users/${userId}`, {
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
                setUser(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchUser();
    }, [token, userKey, userId]);

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

    const handleViewOrders = () => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/orders`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewPayments = () => {
        if (userKey === "Admin" || userKey === "Accountant") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/payments`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewLoans = () => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/loans`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewBooks = () => {
        if (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/books`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewUsers = () => {
        if (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/users`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewActivity = (id) => {
        if (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/reports/own/${id}`);
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
            <DashboardTabs
                inventory={ inventory }
                reports={ reports }
                user={ user }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
                handleViewOrders={ handleViewOrders }
                handleViewPayments={ handleViewPayments }
                handleViewLoans={ handleViewLoans }
                handleViewBooks={ handleViewBooks }
                handleViewUsers={ handleViewUsers }
                handleViewActivity={ handleViewActivity }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default DashboardPage;
