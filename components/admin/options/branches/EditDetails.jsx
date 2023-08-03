import Image from "next/image";

const EditDetails = ({
    branch,
    editedBranch,
    isLoading,
    handleViewBranch,
    handleInputChange,
    handleSubmit }) => {

    if (!branch) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading Branch Details . . .</p>
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
                    onClick={ () => handleViewBranch(branch._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Branch"
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
                                Edit Branch Details
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Branch Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="branch"
                                    value={ editedBranch.branch }
                                    onChange={ handleInputChange }
                                    placeholder={ branch.branch || "Enter Branch Name" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Address:</p>
                                <textarea
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="address"
                                    value={ editedBranch.address }
                                    onChange={ handleInputChange }
                                    placeholder={ branch.address || "Enter Address" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Email:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="email"
                                    value={ editedBranch.email }
                                    onChange={ handleInputChange }
                                    placeholder={ branch.email || "Enter Email" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Phone Number:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="phoneNumber"
                                    value={ editedBranch.phoneNumber }
                                    onChange={ handleInputChange }
                                    placeholder={ branch.phoneNumber || "Enter Phone Number" }
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
