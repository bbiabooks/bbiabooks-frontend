import ConfirmationModal from "@components/main/ConfirmationModal";
import Image from "next/image";

const UserDetails = ({
    user,
    handleUserList,
    isDeleting,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete, }) => {

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading User Details . . .</p>
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
                    onClick={ handleUserList }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Users"
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
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">User Details</h1>
                        <div className="flex justify-center items-center mb-2">
                            <Image
                                src={ user.idPhoto ? user.idPhoto : "/id-photo.svg" }
                                alt="ID Photo"
                                width={ 500 }
                                height={ 500 }
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">User Type:</p> { user.userType.userType }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Branch:</p> { user.branch ? user.branch.branch : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Subject Area:</p> { user.subjectArea ? user.subjectArea.subjectArea : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Grade Level:</p> { user.gradeLevel ? user.gradeLevel.gradeLevel : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Username:</p> { user.username }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">First Name:</p> { user.firstName }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Last Name:</p> { user.lastName }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date of Birth:</p> { user.date_of_birth.slice(0, 10) }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Gender:</p> { user.gender }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Street:</p> { user.street }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">City:</p> { user.city }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">State/Province:</p> { user.stateProvince }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Zip Code:</p> { user.zipCode }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Country:</p> { user.country }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Email:</p> { user.email }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Phone Number:</p> { user.phoneNumber }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Registered:</p> { new Date(user.dateRegistered).toLocaleString() }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Last Updated:</p> { new Date(user.updatedAt).toLocaleString() }
                        </div>
                        <div className="border-t pt-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-2">
                            <button
                                className="hover:bg-rose-400 text-center hover:text-white text-rose-400 font-bold py-2 px-4 rounded-full"
                                disabled={ isDeleting }
                                onClick={ () => handleDeleteUser(user._id) }
                            >
                                { isDeleting ? "Deleting..." : "Delete User" }
                            </button>
                            <button
                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                    } text-white font-bold py-2 px-4 rounded-full` }
                                disabled={ isLoading }
                                onClick={ () => handleEditUser(user._id) }
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

export default UserDetails;
