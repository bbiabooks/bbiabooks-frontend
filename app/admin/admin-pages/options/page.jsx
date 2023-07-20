"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import OptionTabs from "@components/admin/options/OptionTabs";

const OptionTabsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const { userKey } = useAuthContext();
    const router = useRouter();

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

    const handleViewBranches = () => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/branches`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewGradeLevels = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/gradeLevels`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewSubjectAreas = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/subjectAreas`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleViewSuppliers = () => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/suppliers`);
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

    const handleCreateGradeLevel = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/gradeLevels/create`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleCreateSubjectArea = () => {
        if (userKey === "Admin") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/options/subjectAreas/create`);
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

    return (
        <div>
            <OptionTabs
                handleViewBranches={ handleViewBranches }
                handleViewGradeLevels={ handleViewGradeLevels }
                handleViewSuppliers={ handleViewSuppliers }
                handleViewSubjectAreas={ handleViewSubjectAreas }
                handleCreateBranch={ handleCreateBranch }
                handleCreateGradeLevel={ handleCreateGradeLevel }
                handleCreateSubjectArea={ handleCreateSubjectArea }
                handleCreateSupplier={ handleCreateSupplier }
                isLoading={ isLoading }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleConfirm={ handleConfirm }
            />
        </div>
    );
};

export default OptionTabsPage;
