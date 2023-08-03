"use client";
import { useState } from "react";
import Image from 'next/image';

const CreateDetails = ({
    book,
    orderData,
    users,
    paymentMethod,
    orderStatus,
    isLoading,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleBookCatalogue }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.lastName}, ${user.firstName} ${user.username}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    }).filter((user) => user.userType.userType === "Teacher" || user.userType.userType === "Student");

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
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
                    onClick={ handleBookCatalogue }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Book Catalogue"
                        width={ 25 }
                        height={ 25 }
                        className="object-contain"
                    />
                    <p>Back</p>
                </button>
            </div>
            <div className="flex justify-center items-center min-h-full">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex-grow">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)] flex-grow">
                        <form onSubmit={ handleSubmit }>
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Create New Order
                            </h1>
                            <div className="flex justify-center items-center mb-2">
                                <Image
                                    src={ book.coverImage ? book.coverImage : "/book.svg" }
                                    alt="Book Cover"
                                    width={ 250 }
                                    height={ 250 }
                                    className="object-cover rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book ID:</p>
                                <input
                                    disabled
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="book"
                                    value={ orderData.book = book._id }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Title:</p>
                                <textarea
                                    disabled
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    value={ book.title }
                                />
                            </div>
                            <div className="flex items-center">
                                <p className="text-base font-semibold mr-4">Reserved For: <span className="text-red-500">*</span></p>
                            </div>
                            <div className="mb-4 flex items-center">
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 rounded"
                                    name="reservedFor"
                                    value={ orderData.reservedFor || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select User
                                    </option>
                                    { filteredUsers.map((user) => (
                                        <option key={ user._id } value={ user._id }>
                                            { user.lastName + ", " + user.firstName + " " + user.middleName }
                                        </option>
                                    )) }
                                </select>
                                <div className="flex flex-row items-center space-x-2 text-cyan-600 opacity-70 hover:opacity-100">
                                    <input
                                        type="text"
                                        className="ml-2 border-b border-gray-300 px-3 py-2 w-full focus:outline-none"
                                        placeholder="Search"
                                        value={ searchTerm }
                                        onChange={ handleSearchTermChange }
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
                            <div className="mb-4">
                                <p className="text-base font-semibold">Order Status: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="orderStatus"
                                    value={ orderData.orderStatus || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Order Status
                                    </option>
                                    { orderStatus.map((orderStatus) => {
                                        return (
                                            <option key={ orderStatus } value={ orderStatus }>
                                                { orderStatus }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Payment Method: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="paymentMethod"
                                    value={ orderData.paymentMethod || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Payment Method
                                    </option>
                                    { paymentMethod.map((paymentMethod) => {
                                        return (
                                            <option key={ paymentMethod } value={ paymentMethod }>
                                                { paymentMethod }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Proof of Payment:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="file"
                                    name="proofOfPayment"
                                    onChange={ handleFileChange }
                                />
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? 'Creating...' : 'Create Order' }
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        </div >
    );
};

export default CreateDetails;
