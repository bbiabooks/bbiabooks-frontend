"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import SupplierDetails from "@components/admin/options/suppliers/SupplierDetails";

const SupplierDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token, userKey } = useAuthContext();
    const [supplier, setSupplier] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/suppliers/admin/${params.id}`, {
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
                setSupplier(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Supplier. ${error.message}`);
            }
        };

        fetchSupplier();
    }, [params.id, token]);

    const handleUnauthorizedAction = () => {
        const warningMessage = `You are unauthorized to make this action as "${userKey}".`;
        const confirmMessage = "FOR ANY CHANGE YOU WISHES, PLEASE CONTACT THE ADMIN IN CHARGE.";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleEditSupplier = (id) => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/suppliers/edit/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleDeleteSupplier = () => {
        if (userKey === "Admin") {
            const warningMessage = `DELETING "${supplier._id}" . . .`;
            const confirmMessage = "Are you sure you want to delete this Supplier?";
            setWarningMessage(warningMessage);
            setConfirmMessage(confirmMessage);
            setIsConfirmationModalOpen(true);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleConfirmDelete = async () => {
        if (userKey === "Admin") {
            setIsConfirmationModalOpen(false);
            setIsDeleting(true);

            try {
                const response = await fetch(`${URL}/api/suppliers/admin/${supplier._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    // Supplier deleted successfully
                    setSuccessMessage(data.message);
                    router.push(`/admin/admin-pages/options/suppliers`);
                } else {
                    // Error deleting Supplier
                    setErrorMessage(data.message);
                }

            } catch (error) {
                setErrorMessage(`Failed to delete Supplier. ${error.message}`);
            } finally {
                setIsDeleting(false);
            }
        }
        else {
            setIsConfirmationModalOpen(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleSupplierList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/suppliers`);
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
            <SupplierDetails
                supplier={ supplier }
                isDeleting={ isDeleting }
                isLoading={ isLoading }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleEditSupplier={ handleEditSupplier }
                handleDeleteSupplier={ handleDeleteSupplier }
                handleConfirmDelete={ handleConfirmDelete }
                handleCancelDelete={ handleCancelDelete }
                handleSupplierList={ handleSupplierList }
            />
        </div>
    );
};

export default SupplierDetailsPage;
