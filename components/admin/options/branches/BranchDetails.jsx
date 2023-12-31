import ConfirmationModal from "@components/main/ConfirmationModal";
import Image from "next/image";

const BranchDetails = ({
    branch,
    handleBranchList,
    isDeleting,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleEditBranch,
    handleDeleteBranch,
    handleConfirmDelete,
    handleCancelDelete, }) => {

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
                    onClick={ handleBranchList }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Branches"
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
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">Branch Details</h1>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Branch Name:</p> { branch.branch }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Address:</p> { branch.address }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Email:</p> { branch.email }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Phone Number:</p> { branch.phoneNumber }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Created:</p> { new Date(branch.createdAt).toLocaleString() }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Last Updated:</p> { new Date(branch.updatedAt).toLocaleString() }
                        </div>
                        <div className="border-t pt-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-2">
                            <button
                                className="hover:bg-rose-400 text-center hover:text-white text-rose-400 font-bold py-2 px-4 rounded-full"
                                disabled={ isDeleting }
                                onClick={ () => handleDeleteBranch(branch._id) }
                            >
                                { isDeleting ? "Deleting..." : "Delete Branch" }
                            </button>
                            <button
                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                    } text-white font-bold py-2 px-4 rounded-full` }
                                disabled={ isLoading }
                                onClick={ () => handleEditBranch(branch._id) }
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

export default BranchDetails;
