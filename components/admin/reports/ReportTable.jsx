"use client";
import { useState } from "react";
import Image from "next/image";
import ConfirmationModal from "@components/main/ConfirmationModal";

const ReportTable = ({
    handleViewReport,
    reports,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleConfirm }) => {

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

    const filteredActivities = reports.filter((report) => {
        const { user_id, action, createdAt } = report;
        const userTypeV = user_id.userType.userType;
        const formattedDate = new Date(createdAt).toLocaleString();

        return userTypeV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formattedDate.includes(searchTerm);
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-grow flex items-start justify-center w-full min-h-full">
            {/* Add a print-only class to the root div for print styling */ }
            <div className={ `print-only w-full ${isPrinting ? "print-table" : ""}` }>
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    User Activities
                </h1>
                <div className="hide-print flex justify-between items-center mt-8">
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
                <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                    <div className="flex justify-end">
                        <p className="text-sm font-bold text-gray-600">
                            Total Activities: { filteredActivities.length }
                        </p>
                    </div>
                    <div className="hide-print flex items-center w-96">
                        <input
                            type="text"
                            id="search"
                            value={ searchTerm }
                            onChange={ handleSearch }
                            className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                            placeholder="Search by: activity | user type | date"
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
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)]">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-full text-sm">
                        <thead>
                            <tr className="bg-cyan-900">
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">User Type</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Activity</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Timestamp</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredActivities.map((report) => (
                                <tr key={ report._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { report.user_id.userType.userType }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { report.action }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { new Date(report.createdAt).toLocaleString() }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                disabled={ isLoading }
                                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                    } text-white font-bold py-2 px-4 rounded-md` }
                                                onClick={ () => handleViewReport(report._id) }
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

export default ReportTable;
