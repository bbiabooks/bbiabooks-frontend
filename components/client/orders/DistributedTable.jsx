"use client";
import { useState } from "react";
import Image from "next/image";

const OrderTable = ({
    handleViewOrder,
    handleOrderList,
    orders,
    isLoading, }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter((order) => {
        const { _id, book, orderStatus, arrivalDate, updatedAt } = order;
        const bookV = book ? book.title : "N/A";
        const formattedDate = new Date(updatedAt).toLocaleString();

        return _id.includes(searchTerm) ||
            bookV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            arrivalDate.includes(searchTerm) ||
            formattedDate.includes(searchTerm);;
    }).filter((order) => order.orderStatus === "released");;

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-grow flex items-start justify-center m-12 min-h-full">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    Books Received
                </h1>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex justify-start mb-4">
                        <button
                            disabled={ isLoading }
                            className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                } text-white font-bold py-2 px-4 rounded-full flex space-x-2` }
                            onClick={ handleOrderList }
                        >
                            <Image
                                src="/back.svg"
                                alt="Back to Orders"
                                width={ 25 }
                                height={ 25 }
                                className="object-contain"
                            />
                            <p>Back</p>
                        </button>
                    </div>
                    <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                        <div className="flex justify-end">
                            <p className="text-sm font-bold text-gray-600">
                                Total Orders: { filteredOrders.length }
                            </p>
                        </div>
                        <div className="flex items-center w-96">
                            <input
                                type="text"
                                id="search"
                                value={ searchTerm }
                                onChange={ handleSearch }
                                className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                                placeholder="Search by: id | title | date"
                            />
                            <Image
                                src="/search.svg"
                                alt="Search"
                                width={ 20 }
                                height={ 20 }
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)]">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-full text-sm">
                        <thead>
                            <tr className="bg-cyan-900">
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Order ID</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Book Title</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Date Ordered</th>
                                <th className="px-4 py-2 text-white font-semibold">Arrival Date</th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Date Received</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredOrders.map((order) => (
                                <tr key={ order._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2 object-cover">
                                        <div className="flex justify-start items-center mb-2">
                                            <Image
                                                src={ order.book.coverImage ? order.book.coverImage : "/book.svg" }
                                                alt="Book Cover"
                                                width={ 100 }
                                                height={ 100 }
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <p className="text-xs">{ order._id }</p>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.book ? order.book.title : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { order.createdAt.slice(0, 10) }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { order.arrivalDate.slice(0, 10) }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { new Date(order.updatedAt).toLocaleString() }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                disabled={ isLoading }
                                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                    } text-white font-bold py-2 px-4 rounded-md` }
                                                onClick={ () => handleViewOrder(order._id) }
                                            >
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderTable;
