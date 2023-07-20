import ConfirmationModal from "@components/main/ConfirmationModal";
import Image from "next/image";

const BookDetails = ({
    book,
    handleBookList,
    isDeleting,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleEditBook,
    handleDeleteBook,
    handleConfirmDelete,
    handleCancelDelete, }) => {

    if (!book) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading Book Details . . .</p>
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
                    onClick={ handleBookList }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Books"
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
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">Book Details</h1>
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
                            <p className="text-base font-semibold">Book Title:</p> { book.title }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Book Description:</p> { book.bookDescription }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Authors:</p> { book.authors }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">ISBN:</p> { book.ISBN }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Publication Date:</p> { book.publicationDate.slice(0, 10) }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Edition:</p> { book.edition }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Language Used:</p> { book.language }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Shelf Location:</p> { book.location }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Purchase Price:</p> ₱ { book.purchasePrice }
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
                            <p className="text-base font-semibold">Number of Available Copies:</p> { book.numberOfCopies }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Number of Loaned Out Copies:</p> { book.numberOfLoanedOutCopies }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Number of Sold Copies:</p> { book.numberOfSoldCopies }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Number of Lost Copies:</p> { book.numberOfLostCopies }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Number of Damaged Copies:</p> { book.numberOfDamagedCopies }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Created:</p> { new Date(book.createdAt).toLocaleString() }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Last Updated:</p> { new Date(book.updatedAt).toLocaleString() }
                        </div>
                        <div className="border-t pt-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-2">
                            <button
                                className="border border-rose-400 hover:bg-rose-400 text-center hover:text-white text-rose-400 font-bold py-2 px-4 rounded-full"
                                disabled={ isDeleting }
                                onClick={ () => handleDeleteBook(book._id) }
                            >
                                { isDeleting ? "Deleting..." : "Delete Book" }
                            </button>
                            <button
                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                    } text-white font-bold py-2 px-4 rounded-full` }
                                disabled={ isLoading }
                                onClick={ () => handleEditBook(book._id) }
                            >
                                { isLoading ? "Please wait..." : "Edit Details" }
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

export default BookDetails;
