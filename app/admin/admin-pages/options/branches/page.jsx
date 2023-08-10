"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import BranchTable from "@components/admin/options/branches/BranchTable";

const BranchTablePage = () => {
    const [branches, setBranches] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // Fetch all branches from the backend API
        const fetchBranches = async () => {
            try {
                const response = await fetch(`${URL}/api/branches/admin`, {
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
                setBranches(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Branches. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBranches();
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

    const handleCreateBranch = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/branches/create`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewBranch = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/branches/${id}`);
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
            <BranchTable
                branches={ branches }
                handleViewOptions={ handleViewOptions }
                handleCreateBranch={ handleCreateBranch }
                handleViewBranch={ handleViewBranch }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default BranchTablePage;
