"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/admin/users/CreateDetails';

const CreateUserDetailsPage = () => {
    const router = useRouter();
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [userTypes, setUserTypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [subjectAreas, setSubjectAreas] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [userData, setUserData] = useState({ idPhoto: null });
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleUserList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/users`);
    };

    const handleInputChange = (e) => {
        if (e.target.name === "idPhoto" && e.target.files.length > 0) {
            setUserData({
                ...userData,
                idPhoto: e.target.files[0],
            });
        } else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setUserData({
                ...userData,
                idPhoto: e.target.files[0],
            });
        }
    };

    const createUser = async (userData) => {
        setIsLoading(true);

        try {
            // Create form data
            const formData = new FormData();
            for (const key in userData) {
                formData.append(key, userData[key]);
            }

            // Perform the create logic here
            // Example: make a POST request to create a new user
            const response = await fetch(`${URL}/api/users/admin`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // User created successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/users`);
            } else {
                // Error creating User
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to create new User. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await fetch(
                    `${URL}/api/userTypes/admin`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setUserTypes(data);
            } catch (error) {
                const data = await response.json();
                setErrorMessage(`Failed to fetch User Types. ${error.message}`);
            }
        };

        fetchUserTypes();
    }, [token]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch(
                    `${URL}/api/branches/admin`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
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

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
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
            }
        };

        fetchGradeLevels();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        createUser(userData);
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
            <CreateDetails
                userData={ userData }
                isLoading={ isLoading }
                userTypes={ userTypes }
                branches={ branches }
                subjectAreas={ subjectAreas }
                gradeLevels={ gradeLevels }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit }
                handleUserList={ handleUserList }
            />
        </div>
    );
};

export default CreateUserDetailsPage;
