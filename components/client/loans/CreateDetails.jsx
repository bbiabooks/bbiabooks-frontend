import Image from 'next/image';

const CreateDetails = ({
    book,
    loanData,
    user,
    isLoading,
    handleSubmit,
    handleBookCatalogue,
}) => {

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
                    className={ `bg-cyan-700 ${isLoading ? 'cursor-not-allowed' : 'hover:bg-orange-300'
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
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-lg">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        <form onSubmit={ handleSubmit } className="w-full">
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Borrow Book
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
                                <p className="text-base font-semibold">Book ID:</p>
                                <input
                                    disabled
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="book"
                                    value={ (loanData.book = book._id) }
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
                            <div className="mb-4 mt-4">
                                <input
                                    hidden
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="borrower"
                                    value={ loanData.borrower = user._id }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Borrower:</p>
                                <input
                                    disabled
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    value={ user.firstName + " " + (user.middleName ? user.middleName + " " + user.lastName : " " + user.lastName) }
                                />
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? 'cursor-not-allowed' : 'hover:bg-orange-300'} text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? 'Please wait...' : 'Borrow Book' }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDetails;
