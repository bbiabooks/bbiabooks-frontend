"use client";
import { useState } from "react";
import Image from "next/image";

const LoanTable = ({
    handleViewLoan,
    handleBookCatalogue,
    handleReturnedList,
    loans,
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

    const filteredLoans = loans.filter((loan) => {
        const { _id, book, borrower, loanStatus, dueDate, updatedAt } = loan;
        const bookV = book ? book.title : "N/A";
        const userTypeV = borrower ? borrower.userType.userType : "N/A";
        const branchV = borrower ? borrower.branch.branch : "N/A";
        const borrowerV = borrower ? (`${borrower.firstName} ${borrower.lastName}`) : "N/A";
        const formattedDate = new Date(updatedAt).toLocaleString();

        return _id.includes(searchTerm) ||
            bookV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branchV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            userTypeV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            borrowerV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            loanStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dueDate.includes(searchTerm) ||
            formattedDate.includes(searchTerm);
    }).filter((loan) => loan.loanStatus !== "returned");

    const pendingApproval = filteredLoans.filter(
        (loan) => loan.loanStatus === "requested"
    ).length;

    const loanedOut = filteredLoans.filter(
        (loan) => loan.loanStatus === "approved"
    ).length;

    const returned = loans.filter(
        (loan) => loan.loanStatus === "returned"
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
                    Books Borrowed
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
                            <p className="text-xs font-semibold ml-4">Pending Approvals</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ pendingApproval }</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/loans.svg"
                                    alt="View Active Borrows"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Active Borrows</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ loanedOut }</p>
                        </div>
                    </div>
                    <button className={ `border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-100"
                        }` }
                        disabled={ isLoading }
                        onClick={ handleReturnedList }
                    >
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/released.svg"
                                    alt="View Returned"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Returned</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ returned }</p>
                        </div>
                    </button>
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
                                Total Borrows: { filteredLoans.length }
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
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)] w-screen md:w-[928px]">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-full text-sm">
                        <thead>
                            <tr className="bg-cyan-900">
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Borrow ID</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Book Title</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Branch</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">User Type</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Borrower</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Due Date</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Last Updated</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Borrowed Status</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredLoans.map((loan) => (
                                <tr key={ loan._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2 object-cover">
                                        <div className="flex justify-center items-center mb-2">
                                            <Image
                                                src={ loan.book && (loan.book.coverImage || loan.book.coverImage === null) ? loan.book.coverImage : "/book.svg" }
                                                alt="Book Cover"
                                                width={ 100 }
                                                height={ 100 }
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <p className="text-xs">{ loan._id }</p>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { loan.book ? loan.book.title : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { loan.borrower ? loan.borrower.branch.branch : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { loan.borrower ? loan.borrower.userType.userType : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { loan.borrower ? (loan.borrower.firstName + " " + loan.borrower.lastName) : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { loan.dueDate.slice(0, 10) }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { new Date(loan.updatedAt).toLocaleString() }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { loan.loanStatus }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                disabled={ isLoading }
                                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                    } text-white font-bold py-2 px-4 rounded-md` }
                                                onClick={ () => handleViewLoan(loan._id) }
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

export default LoanTable;
