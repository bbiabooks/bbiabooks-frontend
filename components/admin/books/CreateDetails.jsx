import Image from "next/image";

const CreateDetails = ({
    bookData,
    isLoading,
    suppliers,
    subjectAreas,
    gradeLevels,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleBookList }) => {

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
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex-grow">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)] flex-grow">
                        <form onSubmit={ handleSubmit }>
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Create New Book
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Supplier: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="supplier"
                                    value={ bookData.supplier || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Supplier
                                    </option>
                                    { suppliers.map((supplier) => {
                                        return (
                                            <option key={ supplier._id } value={ supplier._id }>
                                                { supplier.supplier }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Subject Area: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="subjectArea"
                                    value={ bookData.subjectArea || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Subject Area
                                    </option>
                                    { subjectAreas.map((subjectArea) => {
                                        return (
                                            <option key={ subjectArea._id } value={ subjectArea._id }>
                                                { subjectArea.subjectArea }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Grade Level: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gradeLevel"
                                    value={ bookData.gradeLevel || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Grade Level
                                    </option>
                                    { gradeLevels.map((gradeLevel) => {
                                        return (
                                            <option key={ gradeLevel._id } value={ gradeLevel._id }>
                                                { gradeLevel.gradeLevel }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Cover Image:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="file"
                                    name="coverImage"
                                    onChange={ handleFileChange }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Title: <span className="text-red-500">*</span></p>
                                <textarea
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="title"
                                    value={ bookData.title }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Book Title" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Book Description: <span className="text-red-500">*</span></p>
                                <textarea
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="bookDescription"
                                    value={ bookData.bookDescription }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Book Description" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Language Used: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="language"
                                    value={ bookData.language }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Language Used" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Authors: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="authors"
                                    value={ bookData.authors }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Authors" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">ISBN: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="ISBN"
                                    value={ bookData.ISBN }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter XXX-X-XXXXXX-XX-X" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Edition: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="edition"
                                    value={ bookData.edition }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Edition" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Publication Date: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="publicationDate"
                                    value={ bookData.publicationDate }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter YYYY-MM-DD" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Shelf Location: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="location"
                                    value={ bookData.location }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Shelf Location" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Purchase Price: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="purchasePrice"
                                    value={ bookData.purchasePrice }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Purchase Price" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Number of Copies: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="numberOfCopies"
                                    value={ bookData.numberOfCopies }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Number of Copies" }
                                    required
                                />
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? 'Creating...' : 'Create Book' }
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
