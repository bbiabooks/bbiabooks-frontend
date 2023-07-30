"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import CreateDetails from '@components/client/orders/CreateDetails';

const CreateOrderDetailsPage = ({ params }) => {
    const router = useRouter();
    const { token, userId } = useAuthContext();
    const [paymentMethod, setPaymentMethod] = useState(["cash", "online"]);
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState({ proofOfPayment: null });
    const [book, setBook] = useState([]);
    const [user, setUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBookCatalogue = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/books`);
    };

    const handleInputChange = (e) => {
        if (e.target.name === "proofOfPayment" && e.target.files.length > 0) {
            setOrderData({
                ...orderData,
                proofOfPayment: e.target.files[0],
            });
        } else {
            setOrderData({
                ...orderData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setOrderData({
                ...orderData,
                proofOfPayment: e.target.files[0],
            });
        }
    };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/books/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Something went wrong.");
                }

                const data = await response.json();
                setBook(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Book. ${error.message}`);
            }
        };

        fetchBook();
    }, [params.id, token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/users/${userId}`, {
                    method: "GET",
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
    }, [userId, token]);

    const createOrder = async (orderData) => {
        setIsLoading(true);

        try {
            // Create form data
            const formData = new FormData();
            for (const key in orderData) {
                if (key === 'proofOfPayment' && !orderData[key]) {
                    // Skip appending coverImage if it's not set
                    continue;
                }
                formData.append(key, orderData[key]);
            }

            // Perform the create logic here
            // Example: make a POST request to create a new order
            const response = await fetch(`${URL}/api/orders`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Order created successfully
                setSuccessMessage(data.message + '. Please click the "VIEW" button for the notice.');

                // Reset orderData after successful form submission
                setOrderData({ ...orderData, coverImage: null });

                router.push(`/client/client-pages/orders`);
            } else {
                // Error creating Order
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to create Order. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createOrder(orderData);
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
                book={ book }
                user={ user }
                paymentMethod={ paymentMethod }
                orderData={ orderData }
                isLoading={ isLoading }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit }
                handleBookCatalogue={ handleBookCatalogue }
            />
        </div>
    );
};

export default CreateOrderDetailsPage;
