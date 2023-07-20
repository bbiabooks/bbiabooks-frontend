"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import SubjectAreaTable from "@components/admin/options/subjectAreas/SubjectAreaTable";

const SubjectAreaTablePage = () => {
    const [subjectAreas, setSubjectAreas] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        // Fetch all subjectAreas from the backend API
        const fetchSubjectAreas = async () => {
            try {
                const response = await fetch(`${URL}/api/subjectAreas/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching subject areas.`);
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/admin/admin-pages"); // Redirect to admin dashboard
                    }
                }
                const data = await response.json();
                setSubjectAreas(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Subject Areas. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubjectAreas();
    }, [token]);

    const handleViewOptions = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options`);
    };

    const handleCreateSubjectArea = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/subjectAreas/create`);
    };

    const handleViewSubjectArea = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/options/subjectAreas/${id}`);
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
            <SubjectAreaTable
                subjectAreas={ subjectAreas }
                handleViewOptions={ handleViewOptions }
                handleCreateSubjectArea={ handleCreateSubjectArea }
                handleViewSubjectArea={ handleViewSubjectArea }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default SubjectAreaTablePage;
