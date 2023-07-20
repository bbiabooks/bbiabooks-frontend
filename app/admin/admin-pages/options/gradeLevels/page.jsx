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

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching grade levels.`);
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    }
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
