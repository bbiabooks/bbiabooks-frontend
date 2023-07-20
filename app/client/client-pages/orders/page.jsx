"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@utils/AuthContext";
import { URL } from "@utils/URL";
import OrderTable from "@components/client/orders/OrderTable";

const OrderTablePage = () => {
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        // Fetch all orders from the backend API
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${URL}/api/orders`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setErrorMessage(`An error occurred while fetching orders.`);
                        router.push("/client/client-pages"); // Redirect to client dashboard
                    } else {
                        setErrorMessage("Something went wrong.");
                        router.push("/client/client-pages"); // Redirect to client dashboard
                    }
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                setErrorMessage(`Failed to fetch Orders. ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleViewOrder = (id) => {
        setIsLoading(true);
        router.push(`/client/client-pages/orders/${id}`);
    };

    const handleBookCatalogue = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/books`);
    };

    const handleDistributedList = () => {
        setIsLoading(true);
        router.push(`/client/client-pages/orders/distributed`);
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div>
            { errorMessage && (
                <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                    { errorMessage }
                </div>
            ) }
            <OrderTable
                orders={ orders }
                handleViewOrder={ handleViewOrder }
                handleBookCatalogue={ handleBookCatalogue }
                handleDistributedList={ handleDistributedList }
                isLoading={ isLoading }
            />
        </div>
    );
};

export default OrderTablePage;
