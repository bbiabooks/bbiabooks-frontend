import ConfirmationModal from "@components/main/ConfirmationModal";
import Image from "next/image";

const LoanDetails = ({
    loan,
    handleLoanList,
    isDeleting,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleEditLoan,
    handleDeleteLoan,
    handleConfirmDelete,
    handleCancelDelete, }) => {

    if (!loan) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading Loan Details . . .</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-start mb-4">
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
            <div className="flex justify-center items-center min-h-full">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">Loan Details</h1>
                        <div className="flex justify-center items-center mb-2">
                            <Image
                                src={ loan.book.coverImage ? loan.book.coverImage : "/book.svg" }
                                alt="Book Cover"
                                width={ 500 }
                                height={ 500 }
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Book Title:</p> { loan.book ? loan.book.title : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Subject Area:</p> { loan.book.subjectArea ? loan.book.subjectArea.subjectArea : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Grade Level:</p> { loan.book.gradeLevel ? loan.book.gradeLevel.gradeLevel : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Borrowed By:</p>
                            {
                                loan.user_id ?
                                    (loan.user_id.firstName + " " + loan.user_id.lastName + " (" + loan.user_id.userType.userType + ")")
                                    : "N/A"
                            }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Borrowed For:</p>
                            {
                                loan.borrower ?
                                    (loan.borrower.firstName + " " + loan.borrower.lastName + " (" + loan.borrower.userType.userType + ", "
                                        + (loan.borrower.subjectArea ? loan.borrower.subjectArea.subjectArea
                                            : (loan.borrower.gradeLevel ? loan.borrower.gradeLevel.gradeLevel : "N/A")) + ")")
                                    : "N/A"
                            }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Loan Status:</p> { loan.loanStatus }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Borrowed At:</p> { new Date(loan.createdAt).toLocaleString() }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Last Updated:</p> { new Date(loan.updatedAt).toLocaleString() }
                        </div>
                        <div className="border-t pt-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-2">
                            <button
                                className="hover:bg-rose-400 text-center hover:text-white text-rose-400 font-bold py-2 px-4 rounded-full"
                                disabled={ isDeleting }
                                onClick={ () => handleDeleteLoan(loan._id) }
                            >
                                { isDeleting ? "Deleting..." : "Delete Loan" }
                            </button>
                            <button
                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                    } text-white font-bold py-2 px-4 rounded-full` }
                                disabled={ isLoading }
                                onClick={ () => handleEditLoan(loan._id) }
                            >
                                { isLoading ? "Please wait..." : "Update Loan Status" }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            { isConfirmationModalOpen && (
                <ConfirmationModal
                    warning={ warningMessage }
                    message={ confirmMessage }
                    onConfirm={ handleConfirmDelete }
                    onCancel={ handleCancelDelete }
                />
            ) }
        </div>
    );
};

export default LoanDetails;
