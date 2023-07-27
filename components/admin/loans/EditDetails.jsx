"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const EditDetails = ({
    loan,
    loanStatus,
    bookStatus,
    editedLoan,
    isLoading,
    handleViewLoan,
    handleInputChange,
    handleSubmit }) => {

    if (!loan) {
        return (
            <div className="min-h-screen p-12">
                <p className="text-gray-500 text-2xl font-semibold">Loading Loan Details . . .</p>
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
                    onClick={ () => handleViewLoan(loan._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Loan"
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
                                Update Loan Status
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Loan ID:</p> { loan._id }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Loan Status:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="loanStatus"
                                    value={ editedLoan.loanStatus !== undefined
                                        ? editedLoan.loanStatus
                                        : loan.loanStatus !== undefined && loan.loanStatus !== ""
                                            ? loan.loanStatus
                                            : "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>Select Loan Status</option>
                                    { loanStatus.map((loanStatus) => {
                                        return (
                                            <option key={ loanStatus } value={ loanStatus }>
                                                { loanStatus }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Status:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="bookStatus"
                                    value={ editedLoan.bookStatus !== undefined
                                        ? editedLoan.bookStatus
                                        : loan.bookStatus !== undefined && loan.bookStatus !== ""
                                            ? loan.bookStatus
                                            : "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>Select Loan Status</option>
                                    { bookStatus.map((bookStatus) => {
                                        return (
                                            <option key={ bookStatus } value={ bookStatus }>
                                                { bookStatus }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? "Updating..." : "Update Loan Status" }
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
