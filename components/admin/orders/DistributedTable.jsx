"use client";
import { useState } from "react";
import Image from "next/image";

const OrderTable = ({
    handleViewOrder,
    handleOrderList,
    orders,
    isLoading, }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [isPrinting, setIsPrinting] = useState(false);

    // Function to handle printing the table
    const handlePrintTable = () => {
        setIsPrinting(true);
        window.print();
        setIsPrinting(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter((order) => {
        const { _id, book, reservedFor, orderStatus, arrivalDate, updatedAt } = order;
        const bookV = book ? book.title : "N/A";
        const userTypeV = reservedFor ? reservedFor.userType.userType : "N/A";
        const reservedForV = reservedFor ? (`${reservedFor.firstName} ${reservedFor.lastName}`) : "N/A";
        const formattedDate = new Date(updatedAt).toLocaleString();

        return _id.includes(searchTerm) ||
            bookV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            userTypeV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservedForV.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <div className="flex-col flex items-start justify-start min-h-full p-12 max-w-5xl">
            {/* Add a print-only class to the root div for print styling */ }
            <div className={ `print-only w-full ${isPrinting ? "print-table" : ""}` }>
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    Book Distributed
                </h1>
                <div className="hide-print flex justify-start items-center mt-8">
                    <button
                        disabled={ isLoading }
                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                            } text-white font-bold py-2 px-4 rounded-full flex space-x-2 mr-2` }
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
                    {/* Print Button */ }
                    <button
                        disabled={ isLoading }
                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                            } py-2 px-4 rounded-full` }
                        onClick={ handlePrintTable }
                    >
                        <Image
                            src="/print.svg"
                            alt="print"
                            width={ 24 }
                            height={ 24 }
                            className="object-cover"
                        />
                    </button>
                </div>
                <div className="mt-4 w-full">
                    <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                        <div className="flex justify-end">
                            <p className="text-sm font-bold text-gray-600">
                                Total Orders: { filteredOrders.length }
                            </p>
                        </div>
                        <div className="hide-print flex items-center w-full md:w-96">
                            <input
                                type="text"
                                id="search"
                                value={ searchTerm }
                                onChange={ handleSearch }
                                className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                                placeholder="Search by: id | title | user | status | date"
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
                                    <div className="flex justify-start">Book Title
                                    </div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">User Type</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Reserved For</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Arrival Date</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Order Status</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Date Released</div></th>
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
                                        <p className="text-xs">{ order._id }</p>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.book ? order.book.title : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.reservedFor ? order.reservedFor.userType.userType : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.reservedFor ? (order.reservedFor.firstName + " " + order.reservedFor.lastName) : "N/A" }
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
                                            { new Date(order.updatedAt).toLocaleString() }
                                        </div>
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
            {/* Additional CSS for Print mode */ }
            <style jsx>
                { `
                    @media print {
                        .hide-print {
                            display: none;
                        }
                        body * {
                            display: none;
                        }
                        .overflow-y-auto {
                            overflow-y: visible !important;
                        }
                        .max-h-[calc(100vh-25vh)] {
                            max-height: none !important;
                        }
                        .print-only {
                            display: block !important;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .print-only th,
                        .print-only td {
                            display: table-cell;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default OrderTable;
