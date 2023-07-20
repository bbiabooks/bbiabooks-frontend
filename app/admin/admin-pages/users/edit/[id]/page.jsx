"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/users/EditDetails';
import { useRouter } from 'next/navigation';

const EditUserDetailsPage = ({ params }) => {
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [isLoading, setIsLoading] = useState(false);
    const [userTypes, setUserTypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [subjectAreas, setSubjectAreas] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/users/${params.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setUser(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch User. ${error.message}`);
            }
        };

        fetchUser();
    }, [params.id, token]);

    const updateUser = async (updatedUser) => {
        try {
            const formData = new FormData();
            for (const key in updatedUser) {
                formData.append(key, updatedUser[key]);
            }

            const response = await fetch(`${URL}/api/users/admin/${params.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // User updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/users/${params.id}`);
            } else {
                // Error updating User
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update User. ${error.message}`);
        }
    };

    const handleViewUser = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/users/${id}`);
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'idPhoto') {
            setEditedUser({
                ...editedUser,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setEditedUser({
                ...editedUser,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateUser(editedUser);
        } catch (error) {
            setErrorMessage(`Failed to update User. ${error.message}`);
        }
    };

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await fetch(`${URL}/api/userTypes/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setUserTypes(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch User Types. ${error.message}`);
            }
        };

        fetchUserTypes();
    }, [token]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch(`${URL}/api/branches/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setBranches(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Branches. ${error.message}`);
            }
        };

        fetchBranches();
    }, [token]);

    useEffect(() => {
        const fetchSubjectAreas = async () => {
            try {
                const response = await fetch(`${URL}/api/subjectAreas/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setSubjectAreas(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Subject Areas. ${error.message}`);
            }
        };

        fetchSubjectAreas();
    }, [token]);

    useEffect(() => {
        const fetchGradeLevels = async () => {
            try {
                const response = await fetch(`${URL}/api/gradeLevels/admin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setGradeLevels(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Grade Levels. ${error.message}`);
            }
        };

        fetchGradeLevels();
    }, [token]);

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
            <EditDetails
                user={ user }
                editedUser={ editedUser }
                isLoading={ isLoading }
                userTypes={ userTypes }
                branches={ branches }
                subjectAreas={ subjectAreas }
                gradeLevels={ gradeLevels }
                handleViewUser={ handleViewUser }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditUserDetailsPage;
