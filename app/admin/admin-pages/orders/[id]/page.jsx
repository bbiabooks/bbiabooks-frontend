"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import { useRouter } from "next/navigation";
import OrderDetails from "@components/admin/orders/OrderDetails";

const OrderDetailsPage = ({ params }) => {
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

    const handleEditOrder = (id) => {
        if (userKey === "Admin" || userKey === "Librarian") {
            setIsLoading(true);
            router.push(`/admin/admin-pages/orders/edit/${id}`);
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleOrderList = () => {
        setIsLoading(true);
        router.push(`/admin/admin-pages/orders`);
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
            <OrderDetails
                order={ order }
                isLoading={ isLoading }
                handleEditOrder={ handleEditOrder }
                handleOrderList={ handleOrderList }
            />
        </div>
    );
};

export default OrderDetailsPage;
