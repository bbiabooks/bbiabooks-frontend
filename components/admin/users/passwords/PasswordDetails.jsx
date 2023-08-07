import Image from "next/image";

const PasswordDetails = ({
    password,
    editedPassword,
    isLoading,
    handlePasswordList,
    handleInputChange,
    handleSubmit }) => {

    if (!password) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading Change Password Details . . .</p>
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
                    onClick={ () => handlePasswordList(password._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Passwords"
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
                                User Change Password Details
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">User Type:</p> { password.userId.userType.userType }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Branch:</p> { password.userId.branch.branch }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Subject Area:</p> { password.userId.subjectArea ? password.userId.subjectArea.subjectArea : "N/A" }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Grade Level:</p> { password.userId.gradeLevel ? password.userId.gradeLevel.gradeLevel : "N/A" }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Username:</p> { password.username }
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="password"
                                    value={ editedPassword.password = password.password }
                                    onSubmit={ handleInputChange }
                                    hidden
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">First Name:</p> { password.userId.firstName }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Last Name:</p> { password.userId.lastName }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Email:</p> { password.userId.email }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Phone Number:</p> { password.userId.phoneNumber }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Requested At:</p> { new Date(password.createdAt).toLocaleString() }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Change Password Status:</p> { password.changeStatus }
                            </div>
                            <div className={ `${password.changeStatus === "pending" ? "flex justify-end border-t pt-4" : "hidden"}` }>
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? "Approving..." : "Approve Change Password" }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordDetails;
