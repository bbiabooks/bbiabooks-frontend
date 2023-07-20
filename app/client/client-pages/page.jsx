"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import HomeTabs from "@components/client/HomeTabs";

const HomePage = () => {
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
                const response = await fetch(`${URL}/api/reports/transaction`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch Inventory");
                }

                const data = await response.json();
                setInventory(data);
            } catch (error) {
                setErrorMessage(`Error fetching Home Page: ${error}`);
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

                if (!response.ok) {
                    throw new Error("Failed to fetch Reports");
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

                if (!response.ok) {
                    throw new Error("Failed to fetch User");
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
        if (userKey === "Teacher" || userKey === "Student") {
            setIsLoading(true);
            router.push(`/client/client-pages/orders`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewLoans = () => {
        if (userKey === "Teacher" || userKey === "Student") {
            setIsLoading(true);
            router.push(`/client/client-pages/loans`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewActivity = (id) => {
        if (userKey === "Teacher" || userKey === "Student") {
            setIsLoading(true);
            router.push(`/client/client-pages/reports/${id}`);
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
            <HomeTabs
                inventory={ inventory }
                reports={ reports }
                user={ user }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
                handleViewOrders={ handleViewOrders }
                handleViewLoans={ handleViewLoans }
                handleViewActivity={ handleViewActivity }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default HomePage;
