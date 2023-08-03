import Image from "next/image";

const StockDetails = ({
    book,
    editedBook,
    isLoading,
    handleViewBooks,
    handleInputChange,
    handleSubmit
}) => {

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
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex-grow">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)] flex-grow">
                        <form onSubmit={ handleSubmit }>
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
