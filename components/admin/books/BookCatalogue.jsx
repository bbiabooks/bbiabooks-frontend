"use client";
import { useState } from "react";
import Image from "next/image";
import ConfirmationModal from "@components/main/ConfirmationModal";

const BookCatalogue = ({
    books,
    handleViewBook,
    handleOrderBook,
    handleBorrowBook,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleConfirm }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter((book) => {
        const { title, subjectArea, gradeLevel } = book;
        const subjectAreaV = subjectArea?.subjectArea || "N/A";
        const gradeLevelV = gradeLevel?.gradeLevel || "N/A";

        return subjectAreaV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gradeLevelV.toLowerCase().includes(searchTerm.toLowerCase()) ||
            title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-col flex items-start justify-start min-h-full p-12">
            <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    Book Catalogue
                </h1>
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
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                        { filteredBooks.map((book) => (
                            <div
                                key={ book._id }
                                className="border rounded-lg p-4 flex flex-col justify-between bg-white shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-500 font-semibold">
                                        { book.subjectArea ? book.subjectArea.subjectArea : "N/A" }
                                    </p>
                                    <p className="text-xs text-gray-500 font-semibold">
                                        { book.gradeLevel ? book.gradeLevel.gradeLevel : "N/A" }
                                    </p>
                                </div>
                                <div className="flex justify-center items-center mb-2">
                                    <Image
                                        src={ book.coverImage ? book.coverImage : "/book.svg" }
                                        alt="Book Cover"
                                        width={ 100 }
                                        height={ 100 }
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex flex-row items-center">
                                    <h2 className="text-md font-bold mb-1">{ book.title + " " }
                                        <button
                                            disabled={ isLoading }
                                            className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                } text-white font-bold py-2 px-2 rounded-full mr-2` }
                                            onClick={ () => handleViewBook(book._id) }
                                        >
                                            <Image
                                                src="/view-page.svg"
                                                alt="View Book"
                                                width={ 10 }
                                                height={ 10 }
                                                className="object-cover white-icon"
                                            />
                                        </button></h2>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-row items-center">
                                        <div className="flex items-center">
                                            <Image
                                                src="/available.svg"
                                                alt="Book Available"
                                                width={ 16 }
                                                height={ 16 }
                                                className="object-cover"
                                            />
                                            <p className="text-xs text-gray-500 ml-2">
                                                { book.numberOfCopies < 4 ? 0 : book.numberOfCopies } Available
                                            </p>
                                        </div>
                                        <div className="flex items-center ml-2">
                                            <Image
                                                src="/borrowed.svg"
                                                alt="Book Borrowed"
                                                width={ 16 }
                                                height={ 16 }
                                                className="object-cover"
                                            />
                                            <p className="text-xs text-gray-500 ml-2">
                                                { book.numberOfLoanedOutCopies } Borrowed
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center flex-grow mt-5">
                                        <div className="flex justify-start mr-3">
                                            <p className="text-2xl font-bold">{ "₱ " + book.purchasePrice }</p>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <div className="flex flex-col">
                                                <button
                                                    disabled={ isLoading }
                                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                        } text-white font-bold py-2 px-3 rounded-md flex flex-row items-center justify-start mb-2` }
                                                    onClick={ () => handleOrderBook(book._id) }
                                                >
                                                    <Image
                                                        src="/order.svg"
                                                        alt="Order Book"
                                                        width={ 16 }
                                                        height={ 16 }
                                                        className="object-cover white-icon"
                                                    />
                                                    <p className="ml-2 text-sm">Order</p>
                                                </button>
                                                <button
                                                    disabled={ isLoading }
                                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                        } text-white font-bold py-2 px-3 rounded-md flex flex-row items-center justify-start` }
                                                    onClick={ () => handleBorrowBook(book._id) }
                                                >
                                                    <Image
                                                        src="/loan.svg"
                                                        alt="Borrow Book"
                                                        width={ 16 }
                                                        height={ 16 }
                                                        className="object-cover white-icon"
                                                    />
                                                    <p className="ml-2 text-sm">Borrow</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
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

export default BookCatalogue;
