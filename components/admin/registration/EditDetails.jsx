import Image from "next/image";

const EditDetails = ({
    user,
    editedUser,
    isLoading,
    userTypes,
    branches,
    gradeLevels,
    subjectAreas,
    handleViewSignups,
    handleInputChange,
    handleSubmit }) => {

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading Signup Details . . .</p>
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
                    onClick={ () => handleViewSignups(user._id) }
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
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-lg">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        <form onSubmit={ handleSubmit } className="w-full">
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                User Signup Details
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
                                <input
                                    type="text"
                                    name="idPhoto"
                                    value={ editedUser.idPhoto = user.idPhoto }
                                    onSubmit={ handleInputChange }
                                    hidden
                                />
                                <input
                                    type="text"
                                    name="cloudinary_id"
                                    value={ editedUser.cloudinary_id = user.cloudinary_id }
                                    onSubmit={ handleInputChange }
                                    hidden
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">User Type:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="userType"
                                    value={ user.userType ? editedUser.userType = user.userType._id : "" }
                                    onChange={ handleInputChange }
                                    disabled
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
                                <p className="text-base font-semibold">Branch:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="branch"
                                    value={ user.branch ? editedUser.branch = user.branch._id : "" }
                                    onSubmit={ handleInputChange }
                                    disabled
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
                                <p className="text-base font-semibold">Subject Area:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="subjectArea"
                                    value={ user.subjectArea ? editedUser.subjectArea = user.subjectArea._id : "" }
                                    onSubmit={ handleInputChange }
                                    disabled
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
                                <p className="text-base font-semibold">Grade Level:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gradeLevel"
                                    value={ user.gradeLevel ? editedUser.gradeLevel = user.gradeLevel._id : "" }
                                    onSubmit={ handleInputChange }
                                    disabled
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
                                <p className="text-base font-semibold">Username:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="username"
                                    value={ editedUser.username = user.username }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.username }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="password"
                                    value={ editedUser.password = user.password }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.password }
                                    hidden
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">First Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="firstName"
                                    value={ editedUser.firstName = user.firstName }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.firstName }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Middle Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="middleName"
                                    value={ editedUser.middleName = user.middleName }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.middleName }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Last Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="lastName"
                                    value={ editedUser.lastName = user.lastName }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.lastName }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Date of Birth:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="date_of_birth"
                                    value={ user.date_of_birth.slice(0, 10) }
                                    disabled
                                />
                                <input
                                    type="text"
                                    name="date_of_birth"
                                    value={ editedUser.date_of_birth = user.date_of_birth }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.date_of_birth.slice(0, 10) }
                                    hidden
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Gender:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gender"
                                    value={ editedUser.gender = user.gender }
                                    onSubmit={ handleInputChange }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Street:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="street"
                                    value={ editedUser.street = user.street }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.street }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">City:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="city"
                                    value={ editedUser.city = user.city }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.city }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">State/Province:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="stateProvince"
                                    value={ editedUser.stateProvince = user.stateProvince }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.stateProvince }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Zip Code:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="zipCode"
                                    value={ editedUser.zipCode = user.zipCode }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.zipCode }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Country:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="country"
                                    value={ editedUser.country = user.country }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.country }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Email:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="email"
                                    value={ editedUser.email = user.email }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.email }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Phone Number:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="phoneNumber"
                                    value={ editedUser.phoneNumber = user.phoneNumber }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.phoneNumber }
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Registration Status:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="registration"
                                    value={ editedUser.registration = user.registration }
                                    onSubmit={ handleInputChange }
                                    placeholder={ user.registration }
                                    disabled
                                />
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                    hidden={ user.registration === "approved" }
                                >
                                    { isLoading ? "Registering..." : "Register User" }
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
