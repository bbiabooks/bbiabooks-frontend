"use client";
import { useState } from "react";
import Image from "next/image";

const PaymentTable = ({
    handleViewOrder,
    handleBookCatalogue,
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
        const { _id, book, reservedFor, orderStatus, paymentStatus, updatedAt } = order;
        const bookV = book ? book.title : "N/A";
        const reservedForV = reservedFor ? (`${reservedFor.firstName} ${reservedFor.lastName}`) : "N/A";
        const formattedDate = new Date(updatedAt).toLocaleString();

        return _id.includes(searchTerm) ||
            bookV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservedForV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paymentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formattedDate.includes(searchTerm);;
    });

    const pendingPayment = filteredOrders.filter(
        (order) => order.paymentStatus === "pending"
    ).length;

    const availableOrder = filteredOrders.filter(
        (order) => order.orderStatus === "available" && order.paymentStatus === "paid"
    ).length;

    const paidOrder = filteredOrders.filter(
        (order) => order.paymentStatus === "paid"
    ).length;

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-col flex items-start justify-start min-h-full p-12">
            {/* Add a print-only class to the root div for print styling */ }
            <div className={ `print-only flex-grow ${isPrinting ? "print-table" : ""}` }>
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    Payments
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-3">
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Pending Payments"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Pending Payments</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ pendingPayment }</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/books.svg"
                                    alt="View Available"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">To Release</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ availableOrder }</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/payments.svg"
                                    alt="View Paid Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4"> Paid Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ paidOrder }</p>
                        </div>
                    </div>
                </div>
                <div className="hide-print flex justify-start items-center mt-8">
                    <button
                        disabled={ isLoading }
                        className={ `${isLoading ? "cursor-not-allowed" : "hover:bg-cyan-700 hover:text-white"
                            } border border-cyan-700 text-cyan-700 font-bold py-2 px-4 rounded-full mr-2` }
                        onClick={ handleBookCatalogue }
                    >
                        View Book Catalogue
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
                                placeholder="Search by: id | title | branch | user | status | date"
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
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)] max-w-[1000px]">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-full text-sm">
                        <thead>
                            <tr className="bg-cyan-900">
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Order ID</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Book Title</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Price</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Branch</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Reserved For</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Order Status</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Payment Status</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Last Updated</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredOrders.map((order) => (
                                <tr key={ order._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center items-center mb-2">
                                            <Image
                                                src={ order.book && (order.book.coverImage || order.book.coverImage === null) ? order.book.coverImage : "/book.svg" }
                                                alt="Book Cover"
                                                width={ 150 }
                                                height={ 150 }
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        { order._id }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.book ? order.book.title : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { "₱ " + (order.book ? order.book.purchasePrice : "N/A") }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.reservedFor ? order.reservedFor.branch.branch : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { order.reservedFor ? order.reservedFor.firstName + " " + order.reservedFor.lastName : "N/A" }
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

export default PaymentTable;
