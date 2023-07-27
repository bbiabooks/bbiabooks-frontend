"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const StockDetails = ({
    book,
    editedBook,
    isLoading,
    handleViewBooks,
    handleInputChange,
    handleSubmit
}) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Effect to automatically remove the success/error message after 3 seconds
    useEffect(() => {
        if (successMessage) {
            const successTimer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);

            return () => clearTimeout(successTimer);
        }

        if (errorMessage) {
            const errorTimer = setTimeout(() => {
                setErrorMessage("");
            }, 5000);

            return () => clearTimeout(errorTimer);
        }
    }, [successMessage, errorMessage]);

    if (!book) {
        return (
            <div className="min-h-screen p-12">
                <p className="text-gray-500 text-2xl font-semibold">Loading Book Details . . .</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen p-12">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-12">
            <div className="flex justify-start mb-4">
                <button
                    disabled={ isLoading }
                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                        } text-white font-bold py-2 px-4 rounded-full flex space-x-2` }
                    onClick={ () => handleViewBooks() }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Book"
                        width={ 25 }
                        height={ 25 }
                        className="object-contain"
                    />
                    <p>Back</p>
                </button>
            </div>
            <div className="flex justify-center items-center min-h-full">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-lg">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        { successMessage && (
                            <div className="bg-green-200 text-green-800 py-2 px-4 mb-4 rounded">
                                { successMessage }
                            </div>
                        ) }
                        { errorMessage && (
                            <div className="bg-red-200 text-red-800 py-2 px-4 mb-4 rounded">
                                { errorMessage }
                            </div>
                        ) }
                        <form onSubmit={ handleSubmit } className="w-full">
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Edit Stock Details
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Title:</p> { book.title }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Supplier:</p> { book.supplier ? book.supplier.supplier : "N/A" }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Grade Level:</p> { book.gradeLevel ? book.gradeLevel.gradeLevel : "N/A" }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Subject Area:</p> { book.subjectArea ? book.subjectArea.subjectArea : "N/A" }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Stock:</p>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        disabled={ isLoading }
                                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                            } text-white font-bold py-2 px-4 rounded-md` }
                                        onClick={ () =>
                                            handleInputChange("numberOfCopies", editedBook.numberOfCopies - 1)
                                        }
                                    >
                                        -
                                    </button>
                                    <input
                                        className="border border-gray-300 px-3 py-2 w-24 rounded mx-2 text-center"
                                        type="text"
                                        name="numberOfCopies"
                                        value={ editedBook.numberOfCopies }
                                        readOnly
                                        placeholder={ book.numberOfCopies || "Enter Number of Copies" }
                                    />
                                    <button
                                        type="button"
                                        disabled={ isLoading }
                                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                            } text-white font-bold py-2 px-4 rounded-md` }
                                        onClick={ () =>
                                            handleInputChange("numberOfCopies", editedBook.numberOfCopies + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? "Updating..." : "Update Changes" }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockDetails;
