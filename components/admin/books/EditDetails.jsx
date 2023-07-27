"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const EditDetails = ({
    book,
    editedBook,
    isLoading,
    suppliers,
    subjectAreas,
    gradeLevels,
    handleViewBook,
    handleInputChange,
    handleFileChange,
    handleSubmit }) => {

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
                    onClick={ () => handleViewBook(book._id) }
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
                        <form onSubmit={ handleSubmit } className="w-full">
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Edit Book Details
                            </h1>
                            <div className="flex justify-center items-center mb-2">
                                <Image
                                    src={ book.coverImage ? book.coverImage : "/book.svg" }
                                    alt="Book Cover"
                                    width={ 500 }
                                    height={ 500 }
                                    className="object-cover rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Update Cover Image:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="file"
                                    name="coverImage"
                                    onChange={ handleFileChange }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Supplier:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="supplier"
                                    value={ editedBook.supplier !== undefined
                                        ? editedBook.supplier
                                        : book.supplier !== undefined && book.supplier !== ""
                                            ? book.supplier._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Supplier</option>
                                    { suppliers.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.supplier }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Subject Area:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="subjectArea"
                                    value={ editedBook.subjectArea !== undefined
                                        ? editedBook.subjectArea
                                        : book.subjectArea !== undefined && book.subjectArea !== ""
                                            ? book.subjectArea._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Subject Area</option>
                                    { subjectAreas.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.subjectArea }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Grade Level:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gradeLevel"
                                    value={ editedBook.gradeLevel !== undefined
                                        ? editedBook.gradeLevel
                                        : book.gradeLevel !== undefined && book.gradeLevel !== ""
                                            ? book.gradeLevel._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Grade Level</option>
                                    { gradeLevels.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.gradeLevel }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Title:</p>
                                <textarea
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="title"
                                    value={ editedBook.title }
                                    onChange={ handleInputChange }
                                    placeholder={ book.title || "Enter Book Title" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Description:</p>
                                <textarea
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="bookDescription"
                                    value={ editedBook.bookDescription }
                                    onChange={ handleInputChange }
                                    placeholder={ book.bookDescription || "Enter Book Description" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Language Used:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="language"
                                    value={ editedBook.language }
                                    onChange={ handleInputChange }
                                    placeholder={ book.language || "Enter Language Used" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Authors:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="authors"
                                    value={ editedBook.authors }
                                    onChange={ handleInputChange }
                                    placeholder={ book.authors || "Enter Authors" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">ISBN:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="ISBN"
                                    value={ editedBook.ISBN }
                                    onChange={ handleInputChange }
                                    placeholder={ book.ISBN.slice(0, 10) || "Enter ISBN" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Edition:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="edition"
                                    value={ editedBook.edition }
                                    onChange={ handleInputChange }
                                    placeholder={ book.edition || "Enter Edition" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Publication Date:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="publicationDate"
                                    value={ editedBook.publicationDate }
                                    onChange={ handleInputChange }
                                    placeholder={ book.publicationDate || "Enter Publication Date" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Shelf Location:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="location"
                                    value={ editedBook.location }
                                    onChange={ handleInputChange }
                                    placeholder={ book.location || "Enter Shelf Location" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Purchase Price:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="purchasePrice"
                                    value={ editedBook.purchasePrice }
                                    onChange={ handleInputChange }
                                    placeholder={ book.purchasePrice || "Enter Purchase Price" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Stock:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="numberOfCopies"
                                    value={ editedBook.numberOfCopies }
                                    onChange={ handleInputChange }
                                    placeholder={ book.numberOfCopies || "Enter Number of Copies" }
                                />
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

export default EditDetails;
