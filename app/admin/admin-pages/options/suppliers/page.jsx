"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import SupplierTable from "@components/admin/options/suppliers/SupplierTable";

const SupplierTablePage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // Fetch all suppliers from the backend API
        const fetchSuppliers = async () => {
            try {
                const response = await fetch(`${URL}/api/suppliers/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching suppliers.`);
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    }
                }

                const data = await response.json();
                setSuppliers(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Suppliers. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuppliers();
    }, [token]);

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

    const handleViewOptions = () => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleCreateSupplier = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/suppliers/create`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewSupplier = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/suppliers/${id}`);
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

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <SupplierTable
                suppliers={ suppliers }
                handleViewOptions={ handleViewOptions }
                handleCreateSupplier={ handleCreateSupplier }
                handleViewSupplier={ handleViewSupplier }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default SupplierTablePage;
