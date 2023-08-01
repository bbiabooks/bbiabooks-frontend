"use client";
import { useState } from "react";
import Image from "next/image";

const ReturnedTable = ({
    handleViewLoan,
    handleLoanList,
    loans,
    isLoading, }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredLoans = loans.filter((loan) => {
        const { _id, book, dueDate, updatedAt, bookStatus } = loan;
        const bookV = book ? book.title : "N/A";
        const formattedDate = new Date(updatedAt).toLocaleString();

        return _id.includes(searchTerm) ||
            bookV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bookStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dueDate.includes(searchTerm) ||
            formattedDate.includes(searchTerm);
    }).filter((loan) => loan.loanStatus === "returned");

    const damaged = filteredLoans.filter(
        (loan) => loan.bookStatus === "damaged"
    ).length;

    const lost = filteredLoans.filter(
        (loan) => loan.bookStatus === "lost"
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
                    Books Returned
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-3">
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Damaged Copies"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Damaged Copies</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ damaged }</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-row items-center justify-between bg-white shadow-lg">
                        <div className="flex justify-start items-center">
                            <div className="rounded-full bg-gray-100 p-1">
                                <Image
                                    src="/pending.svg"
                                    alt="View Lost Copies"
                                    width={ 20 }
                                    height={ 20 }
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-xs font-semibold ml-4">Lost Copies</p>
                        </div>
                        <div className="flex justify-end">
                            <p className="text-sm text-gray-500 font-bold ml-8">{ lost }</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center mt-8">
                    <button
                        disabled={ isLoading }
                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                            } text-white font-bold py-2 px-4 rounded-full flex space-x-2` }
                        onClick={ handleLoanList }
                    >
                        <Image
                            src="/back.svg"
                            alt="Back to Loans"
                            width={ 25 }
                            height={ 25 }
                            className="object-contain"
                        />
                        <p>Back</p>
                    </button>
                </div>
                <div className="mt-4 w-full">
                    <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                        <div className="flex justify-end">
                            <p className="text-sm font-bold text-gray-600">
                                Total Borrowed: { filteredLoans.length }
                            </p>
                        </div>
                        <div className="flex items-center w-full md:w-96">
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
                                    <div className="flex justify-start">Borrow ID</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Book Title</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Returned At</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Borrowed Status</th>
                                <th className="px-4 py-2 text-white font-semibold">Book Status</th>
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
                                        { new Date(loan.updatedAt).toLocaleString() }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { loan.loanStatus }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { loan.bookStatus }
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
        </div>
    );
};

export default ReturnedTable;
