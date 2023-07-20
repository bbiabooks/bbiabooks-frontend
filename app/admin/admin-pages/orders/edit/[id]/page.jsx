"use client";
import { useEffect, useState } from 'react';
import { useAuthContext } from '@utils/AuthContext';
import { URL } from "@utils/URL";
import EditDetails from '@components/admin/orders/EditDetails';
import { useRouter } from 'next/navigation';

const EditOrderDetailsPage = ({ params }) => {
    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState(["pending", "placed", "available", "released"]);
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

                if (!response.ok) {
                    throw new Error("Something went wrong.");
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
            const response = await fetch(`${URL}/api/orders/detail/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedOrder),
            });

            const data = await response.json();

            if (response.ok) {
                // Order updated successfully
                setSuccessMessage(data.message);
                router.push(`/admin/admin-pages/orders/${params.id}`);
            } else {
                // Error updating Order
                setErrorMessage(data.message);
            }

        } catch (error) {
            setErrorMessage(`Failed to update Order. ${error.message}`);
        }
    };

    const handleViewOrder = (id) => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/orders/${id}`);
    };

    const handleInputChange = (e) => {
        setEditedOrder({
            ...editedOrder,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Perform the update logic here
            await updateOrder(editedOrder);
        } catch (error) {
            setErrorMessage(`Error updating Order: ${error.message}`);
        }
    };

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
                orderStatus={ orderStatus }
                editedOrder={ editedOrder }
                isLoading={ isLoading }
                handleViewOrder={ handleViewOrder }
                handleInputChange={ handleInputChange }
                handleSubmit={ handleSubmit } />
        </div>
    );
};

export default EditOrderDetailsPage;
