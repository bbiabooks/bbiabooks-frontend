"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import GradeLevelDetails from "@components/admin/options/gradeLevels/GradeLevelDetails";

const GradeLevelDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [gradeLevel, setGradeLevel] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchGradeLevel = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/gradeLevels/admin/${params.id}`, {
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
                setGradeLevel(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Grade Level. ${error.message}`);
            }
        };

        fetchGradeLevel();
    }, [params.id, token]);

    const handleEditGradeLevel = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/gradeLevels/edit/${id}`);
    };

    const handleDeleteGradeLevel = () => {
        const gradeLevelName = gradeLevel.gradeLevel;
        const warningMessage = `DELETING "${gradeLevelName}" . . .`;
        const confirmMessage = "ARE YOU SURE YOU WANT TO DELETE THIS GRADE LEVEL?";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsConfirmationModalOpen(false);
        setIsDeleting(true);

        try {
            const response = await fetch(`${URL}/api/gradeLevels/admin/${gradeLevel._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                // Grade Level deleted successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/options/gradeLevels`);
            } else {
                // Error deleting Grade Level
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to delete Branch. ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleGradeLevelList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/gradeLevels`);
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
            <GradeLevelDetails
                gradeLevel={ gradeLevel }
                isDeleting={ isDeleting }
                isLoading={ isLoading }
                isConfirmationModalOpen={ isConfirmationModalOpen }
                warningMessage={ warningMessage }
                confirmMessage={ confirmMessage }
                handleEditGradeLevel={ handleEditGradeLevel }
                handleDeleteGradeLevel={ handleDeleteGradeLevel }
                handleConfirmDelete={ handleConfirmDelete }
                handleCancelDelete={ handleCancelDelete }
                handleGradeLevelList={ handleGradeLevelList }
            />
        </div>
    );
};

export default GradeLevelDetailsPage;
