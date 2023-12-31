"use client";
import { useRouter, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import GradeLevelTable from "@components/admin/options/gradeLevels/GradeLevelTable";

const GradeLevelTablePage = () => {
    const [gradeLevels, setGradeLevels] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // Fetch all gradeLevels from the backend API
        const fetchGradeLevels = async () => {
            try {
                const response = await fetch(`${URL}/api/gradeLevels/admin`, {
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
                setGradeLevels(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Grade Levels. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGradeLevels();
    }, [token]);

    const handleViewOptions = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options`);
    };

    const handleCreateGradeLevel = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/gradeLevels/create`);
    };

    const handleViewGradeLevel = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/gradeLevels/${id}`);
    };

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <GradeLevelTable
                gradeLevels={ gradeLevels }
                handleViewOptions={ handleViewOptions }
                handleCreateGradeLevel={ handleCreateGradeLevel }
                handleViewGradeLevel={ handleViewGradeLevel }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default GradeLevelTablePage;
