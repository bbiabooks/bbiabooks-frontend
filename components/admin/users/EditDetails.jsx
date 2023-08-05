import Image from "next/image";

const EditDetails = ({
    user,
    editedUser,
    isLoading,
    userTypes,
    branches,
    subjectAreas,
    gradeLevels,
    handleViewUser,
    handleInputChange,
    handleFileChange,
    handleSubmit }) => {

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
                    onClick={ () => handleViewUser(user._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to User"
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
                                Edit User Details
                            </h1>
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
                                <p className="text-base font-semibold">Update Account Status:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="userStatus"
                                    value={ editedUser.userStatus !== undefined ? editedUser.userStatus : (user.userStatus !== "" ? user.userStatus : "Select Account Status") }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Account Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Update User Type:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="userType"
                                    value={ editedUser.userType !== undefined
                                        ? editedUser.userType
                                        : user.userType !== undefined && user.userType !== ""
                                            ? user.userType._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select User Type</option>
                                    { userTypes.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.userType }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Update Branch:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="branch"
                                    value={ editedUser.branch !== undefined
                                        ? editedUser.branch
                                        : user.branch !== undefined && user.branch !== ""
                                            ? user.branch._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Branch</option>
                                    { branches.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.branch }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Update Subject Area:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="subjectArea"
                                    value={ editedUser.subjectArea !== undefined
                                        ? editedUser.subjectArea
                                        : user.subjectArea !== undefined && user.subjectArea !== ""
                                            ? user.subjectArea._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Subject Area</option>
                                    { subjectAreas.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.subjectArea }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Update Grade Level:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gradeLevel"
                                    value={ editedUser.gradeLevel !== undefined
                                        ? editedUser.gradeLevel
                                        : user.gradeLevel !== undefined && user.gradeLevel !== ""
                                            ? user.gradeLevel._id
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Grade Level</option>
                                    { gradeLevels.map((type) => {
                                        return (
                                            <option key={ type._id } value={ type._id }>
                                                { type.gradeLevel }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Username:</p> { user.username }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">First Name:</p> { user.firstName }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Middle Name:</p> { user.middleName || "N/A" }
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
                                <p className="text-base font-semibold">Street:</p> { user.street || "N/A" }
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
