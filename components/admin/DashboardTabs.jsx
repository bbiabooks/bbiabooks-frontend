"use client";
import { useState } from "react";
import ConfirmationModal from "@components/main/ConfirmationModal";
import Image from "next/image";

const DashboardTabs = ({
    inventory,
    reports,
    user,
    handleViewOrders,
    handleViewPayments,
    handleViewLoans,
    handleViewBooks,
    handleViewUsers,
    handleViewActivity,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleConfirm }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredReports = reports.filter((report) => {
        const { action, createdAt } = report;
        const formattedDate = new Date(createdAt).toLocaleString();

        return action.toLowerCase().includes(searchTerm.toLowerCase()) || formattedDate.includes(searchTerm);
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-start min-h-full p-12">
            <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    { `Hello ${user.firstName}!` }
                </h1>
                <p className="text-xs font-bold mb-1 text-cyan-700 opacity-70">Statistics</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewUsers }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/users.svg"
                                    alt="View Users"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Users</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfUsers }</p>
                        </div>
                    </button>
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewBooks }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/books.svg"
                                    alt="View Books"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Books</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfBooks }</p>
                        </div>
                    </button>
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewOrders }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/released.svg"
                                    alt="View Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Released Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfReleased }</p>
                        </div>
                    </button>
                </div>
                <p className="text-xs font-bold mt-2 mb-1 text-cyan-700 opacity-70">Status</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewOrders }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/orders.svg"
                                    alt="View Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Placed Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfPlacedOrders }</p>
                        </div>
                    </button>
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewOrders }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/onhand.svg"
                                    alt="View Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Available Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfAvailable }</p>
                        </div>
                    </button>
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewLoans }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/loans.svg"
                                    alt="View Loans"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Loaned Out</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfApprovedLoans }</p>
                        </div>
                    </button>
                </div>
                <p className="text-xs font-bold mt-2 mb-1 text-cyan-700 opacity-70">Waiting for Approval</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewOrders }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Orders"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Pending Orders</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfPendingOrders }</p>
                        </div>
                    </button>
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewPayments }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Order Payments"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Pending Payments</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfPendingPayments }</p>
                        </div>
                    </button>
                    <button
                        className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                            }` }
                        disabled={ isLoading }
                        onClick={ handleViewLoans }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Loans"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-start text-xs font-semibold ml-4">Pending Loans</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ inventory.numberOfPendingLoans }</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="mt-4 md:mt-1 w-full">
                <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                    <div className="flex justify-end">
                        <p className="text-sm font-bold text-gray-600">
                            Total Activities: { filteredReports.length }
                        </p>
                    </div>
                    <div className="flex items-center w-full md:w-96">
                        <input
                            type="text"
                            id="search"
                            value={ searchTerm }
                            onChange={ handleSearch }
                            className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                            placeholder="Search by: activity | date"
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
                <p className="text-sm font-bold mb-1 text-cyan-700 opacity-70">Own History</p>
                <div className="overflow-y-auto max-h-[calc(100vh-45vh)]">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-full text-sm">
                        <thead>
                            <tr className="bg-cyan-900">
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Your Activities</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Timestamp</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredReports.map((report) => (
                                <tr key={ report._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { report.action }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { new Date(report.createdAt).toLocaleString() }
                                    </td>
                                    <td className="border-t border-cyan-800 p-2">
                                        <div className="flex justify-center">
                                            <button
                                                disabled={ isLoading }
                                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                    } text-white font-bold py-2 px-4 rounded-md` }
                                                onClick={ () => handleViewActivity(report._id) }
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
            { isConfirmationModalOpen && (
                <ConfirmationModal
                    warning={ warningMessage }
                    message={ confirmMessage }
                    onConfirm={ handleConfirm }
                />
            ) }
        </div>
    );
};

export default DashboardTabs;
