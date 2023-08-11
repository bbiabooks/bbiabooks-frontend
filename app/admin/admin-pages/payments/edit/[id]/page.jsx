"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/payments/EditDetails';
import { useRouter } from 'next/navigation';

const EditOrderDetailsPage = ({ params }) => {
    const [order, setOrder] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(["pending", "paid"]);
    const [paymentMethod, setPaymentMethod] = useState(["cash", "online"]);
    const [error, setError] = useState(null);
    const [editedOrder, setEditedOrder] = useState({ ...order });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { token, userKey } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/orders/detail/${params.id}`, {
                    method: 'GET',
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
                setOrder(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Order. ${error.message}`);
            }
        };

        fetchOrder();
    }, [params.id, token, userKey]);

    const updateOrder = async (updatedOrder) => {
        try {
            if (updatedOrder.paymentMethod === "cash" || updatedOrder.paymentMethod === "online") {
                updatedOrder.paymentStatus = "paid";
            }

            const formData = new FormData();
            for (const key in updatedOrder) {
                formData.append(key, updatedOrder[key]);
            }

            const response = await fetch(`${URL}/api/orders/detail/${params.id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Payment updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/payments/receipt/${params.id}`);
            } else {
                // Error updating Payment
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Payment. ${error.message}`);
        }
    };

    const handleViewOrder = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/payments/${id}`);
    };

    const handleInputChange = (e) => {
        if (e.target.name === 'proofOfPayment') {
            setEditedOrder({
                ...editedOrder,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setEditedOrder({
                ...editedOrder,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleFileChange = (e) => {
        setEditedOrder({
            ...editedOrder,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateOrder(editedOrder);
        } catch (error) {
            setErrorMessage(`Failed to update Payment. ${error.message}`);
        }
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
            <EditDetails
                order={ order }
                paymentStatus={ paymentStatus }
                paymentMethod={ paymentMethod }
                editedOrder={ editedOrder }
                isLoading={ isLoading }
                handleViewOrder={ handleViewOrder }
                handleInputChange={ handleInputChange }
                handleFileChange={ handleFileChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditOrderDetailsPage;
