"use client";
import { useEffect, useState } from 'react';
import { URL } from "@utils/URL";
import CreateDetails from '@components/client/registration/CreateDetails';
import { useRouter } from 'next/navigation';

const SignupDetailsPage = () => {
    const [userData, setUserData] = useState({ idPhoto: null });
    const [isLoading, setIsLoading] = useState(false);
    const [userTypes, setUserTypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [subjectAreas, setSubjectAreas] = useState([]);
    const [gradeLevels, setGradeLevels] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

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
            const response = await fetch(`${URL}/api/signups`, {
                method: 'POST',
                headers: {
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // User created successfully
                setSuccessMessage(data.message);
                router.push(`/client/registration`);
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
                const response = await fetch(`${URL}/api/userTypes`);

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setUserTypes(data);
                console.log(`data: ${data}`);
            } catch (error) {
                setErrorMessage(`Failed to fetch User Types. ${error.message}`);
            }
        };

        fetchUserTypes();
    }, []);


    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch(`${URL}/api/branches`);

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setBranches(data);
                console.log(`data: ${data}`);
            } catch (error) {
                setErrorMessage(`Failed to fetch Branches. ${error.message}`);
            }
        };

        fetchBranches();
    }, []);

    useEffect(() => {
        const fetchSubjectAreas = async () => {
            try {
                const response = await fetch(`${URL}/api/subjectAreas`);

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setSubjectAreas(data);
                console.log(`data: ${data}`);
            } catch (error) {
                setErrorMessage(`Failed to fetch Subject Areas. ${error.message}`);
            }
        };

        fetchSubjectAreas();
    }, []);

    useEffect(() => {
        const fetchGradeLevels = async () => {
            try {
                const response = await fetch(`${URL}/api/gradeLevels`);

                if (response.status === 401) {
                    return; // Stop further execution to prevent errors
                }

                if (!response.ok) {
                    setErrorMessage("Something went wrong."); // Handle other errors as needed
                    return; // Stop further execution to prevent errors
                }

                const data = await response.json();
                setGradeLevels(data);
                console.log(`data: ${data}`);
            } catch (error) {
                setErrorMessage(`Failed to fetch Grade Levels. ${error.message}`);
            }
        };

        fetchGradeLevels();
    }, []);

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
                gradeLevels={ gradeLevels }
                subjectAreas={ subjectAreas }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default SignupDetailsPage;
