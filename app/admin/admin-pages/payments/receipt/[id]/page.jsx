"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import OrderReceipt from "@components/admin/payments/OrderReceipt";

const OrderReceiptPage = ({ params }) => {
    const router = useRouter();
    const { token, userKey } = useAuthContext();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                if (!params.id) return; // Return early if id is undefined

                const response = await fetch(`${URL}/api/orders/detail/${params.id}`, {
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
                setOrder(data);

            } catch (error) {
                setErrorMessage(`Failed to fetch Order. ${error.message}`);
            }
        };

        fetchOrder();
    }, [params.id, token, userKey]);

    const handleViewOrder = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/payments/${params.id}`);
    };

    const handleOrderList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/payments`);
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
            <OrderReceipt
                order={ order }
                isLoading={ isLoading }
                handleViewOrder={ handleViewOrder }
                handleOrderList={ handleOrderList }
            />
        </div>
    );
};

export default OrderReceiptPage;
