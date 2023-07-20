"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import BranchDetails from "@components/admin/options/branches/BranchDetails";

const BranchDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token, userKey } = useAuthContext();
    const [branch, setBranch] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/branches/admin/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setBranch(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Branch. ${error.message}`);
            }
        };

        fetchBranch();
    }, [params.id, token]);

    const handleUnauthorizedAction = () => {
        const warningMessage = `You are unauthorized to make this action as "${userKey}".`;
        const confirmMessage = "FOR ANY CHANGE YOU WISHES, PLEASE CONTACT THE ADMIN IN CHARGE.";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleEditBranch = (id) => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/branches/edit/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleDeleteBranch = () => {
        if (userKey === "Admin") {
            const warningMessage = `DELETING "${branch._id}" . . .`;
            const confirmMessage = "Are you sure you want to delete this Branch?";
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
                const response = await fetch(`${URL}/api/branches/admin/${branch._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    // Branch deleted successfully
                    setSuccessMessage(data.message);
                    router.push(`/admin/admin-pages/options/branches`);
                } else {
                    // Error deleting Branch
                    setErrorMessage(data.message);
                }

            } catch (error) {
                setErrorMessage(`Failed to delete Branch. ${error.message}`);
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

    const handleBranchList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/branches`);
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
            <BranchDetails
                branch={ branch }
                isDeleting={ isDeleting }
                isLoading={ isLoading }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleEditBranch={ handleEditBranch }
                handleDeleteBranch={ handleDeleteBranch }
                handleConfirmDelete={ handleConfirmDelete }
                handleCancelDelete={ handleCancelDelete }
                handleBranchList={ handleBranchList }
            />
        </div>
    );
};

export default BranchDetailsPage;
