"use client";
import { useState } from "react";
import Image from "next/image";

const BookTable = ({
    handleViewBook,
    handleBookList,
    handleEditStock,
    books,
    isLoading, }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter((book) => {
        const { title, gradeLevel, subjectArea } = book;
        const gradeLevelV = gradeLevel?.gradeLevel || "N/A";
        const subjectAreaV = subjectArea?.subjectArea || "N/A";

        return gradeLevelV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subjectAreaV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            title.toLowerCase().includes(searchTerm.toLowerCase());
    }).filter((book) => book.numberOfCopies < 4);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-grow flex items-start justify-center w-full min-h-full">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    Book Inventory
                </h1>
                <div className="flex justify-between items-center mt-8">
                    <div className="flex justify-start mb-4">
                        <button
                            disabled={ isLoading }
                            className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                } text-white font-bold py-2 px-4 rounded-full flex space-x-2` }
                            onClick={ handleBookList }
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
                    <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                        <div className="flex justify-end">
                            <p className="text-sm font-bold text-gray-600">
                                Total Books: { filteredBooks.length }
                            </p>
                        </div>
                        <div className="flex items-center w-96">
                            <input
                                type="text"
                                id="search"
                                value={ searchTerm }
                                onChange={ handleSearch }
                                className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                                placeholder="Search by: title | grade level | subject area"
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
                                    <div className="flex justify-start">Cover Image</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Grade Level</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Subject Area</div></th>
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Book Title</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Number of Available Copies</th>
                                <th className="px-4 py-2 text-white font-semibold">Number of Loaned Out Copies</th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredBooks.map((book) => (
                                <tr key={ book._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center items-center mb-2">
                                            <Image
                                                src={ book.coverImage ? book.coverImage : "/book.svg" }
                                                alt="Book Cover"
                                                width={ 150 }
                                                height={ 150 }
                                                className="object-cover rounded"
                                            />
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { book.gradeLevel ? book.gradeLevel.gradeLevel : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { book.subjectArea ? book.subjectArea.subjectArea : "N/A" }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { book.title }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            <div className="flex flex-row gap-4 items-center">
                                                { book.numberOfCopies }
                                                <button
                                                    disabled={ isLoading }
                                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                        } text-white text-base font-bold px-2 rounded-md` }
                                                    onClick={ () => handleEditStock(book._id) }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            { book.numberOfLoanedOutCopies ? book.numberOfLoanedOutCopies : "0" }
                                        </div>
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                disabled={ isLoading }
                                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                    } text-white font-bold py-2 px-4 rounded-md` }
                                                onClick={ () => handleViewBook(book._id) }
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

export default BookTable;
