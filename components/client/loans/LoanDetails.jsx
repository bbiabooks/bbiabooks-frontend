import Image from "next/image";

const LoanDetails = ({
    loan,
    handleLoanList,
    isLoading, }) => {

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
        <div className="min-h-screen m-12">
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
                        <div className="mb-4 mt-4">
                            <p className="text-base font-semibold">Notice:</p>
                            { loan.dueDate.slice(0, 10) === loan.createdAt.slice(0, 10) ?
                                <p className="text-base font-semibold text-rose-400">
                                    { `Your requested book is expected to be available on or before ${loan.dueDate.slice(0, 10)}. Please make a new request after the said date.` }
                                </p> :
                                <p className="text-base font-semibold text-rose-400">
                                    { "Your requested book is already available and is ready to pick up." } </p>
                            }
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
                        <div className="mb-4 border-b pb-4">
                            <p className="text-base font-semibold">Status Last Updated:</p> { new Date(loan.updatedAt).toLocaleString() }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;
