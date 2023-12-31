"use client";
import { useState } from "react";
import Image from "next/image";

const OrderTable = ({
    handleViewOrder,
    handleBookCatalogue,
    handleDistributedList,
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
    }).filter((order) => order.orderStatus !== "released");;

    const pendingApproval = filteredOrders.filter(
        (order) => order.orderStatus === "pending"
    ).length;

    const placedOrder = filteredOrders.filter(
        (order) => order.orderStatus === "placed"
    ).length;

    const availableOrder = filteredOrders.filter(
        (order) => order.orderStatus === "available"
    ).length;

    const orderDistributed = orders.filter(
        (order) => order.orderStatus === "released"
    ).length;

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
                    Book Orders
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-3">
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Pending Approvals"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Pending Placements</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ pendingApproval }</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/orders.svg"
                                    alt="View Placed Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Placed Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ placedOrder }</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/books.svg"
                                    alt="View Available Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Available Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ availableOrder }</p>
                        </div>
                    </div>
                    <button className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                        }` }
                        disabled={ isLoading }
                        onClick={ handleDistributedList }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/released.svg"
                                    alt="View Released Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Received</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ orderDistributed }</p>
                        </div>
                    </button>
                </div>
                <div className="flex justify-start items-center mt-8">
                    <button
                        disabled={ isLoading }
                        className={ `${isLoading ? "cursor-not-allowed" : "hover:bg-cyan-700 hover:text-white"
                            } border border-cyan-700 text-cyan-700 font-bold py-2 px-4 rounded-full` }
                        onClick={ handleBookCatalogue }
                    >
                        View Book Catalogue
                    </button>
                </div>
                <div className="mt-4 w-full">
                    <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                        <div className="flex justify-end">
                            <p className="text-sm font-bold text-gray-600">
                                Total Transactions: { filteredOrders.length }
                            </p>
                        </div>
                        <div className="flex items-center w-full md:w-96">
                            <input
                                type="text"
                                id="search"
                                value={ searchTerm }
                                onChange={ handleSearch }
                                className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                                placeholder="Search by: id | title | status | date"
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
                                <th className="px-4 py-2 text-white font-semibold">Order ID</th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Book Title
                                    </div></th>
                                <th className="px-4 py-2 text-white font-semibold">Arrival Date</th>
                                <th className="px-4 py-2 text-white font-semibold">Order Status</th>
                                <th className="px-4 py-2 text-white font-semibold">Payment Status</th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Last Updated</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredOrders.map((order) => (
                                <tr key={ order._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2 object-cover">
                                        <div className="flex justify-center items-center mb-2">
                                            <Image
                                                src={ order.book && (order.book.coverImage || order.book.coverImage === null) ? order.book.coverImage : "/book.svg" }
                                                alt="Book Cover"
                                                width={ 100 }
                                                height={ 100 }
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="text-xs">{ order._id }</p>
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.book ? order.book.title : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { order.arrivalDate.slice(0, 10) }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { order.orderStatus }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { order.paymentStatus }
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
