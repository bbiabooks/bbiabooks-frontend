import Image from "next/image";

const EditProfile = ({
    user,
    editedUser,
    isLoading,
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
                                <p className="text-base font-semibold">Update ID Photo:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="file"
                                    name="idPhoto"
                                    onChange={ handleFileChange }
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
                                <p className="text-base font-semibold">Username:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="username"
                                    value={ editedUser.username }
                                    onChange={ handleInputChange }
                                    placeholder={ user.username || "Enter Username" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">First Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="firstName"
                                    value={ editedUser.firstName }
                                    onChange={ handleInputChange }
                                    placeholder={ user.firstName || "Enter First Name" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Middle Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="middleName"
                                    value={ editedUser.middleName }
                                    onChange={ handleInputChange }
                                    placeholder={ user.middleName || "Enter Middle Name" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Last Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="lastName"
                                    value={ editedUser.lastName }
                                    onChange={ handleInputChange }
                                    placeholder={ user.lastName || "Enter Last Name" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Date of Birth:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="date_of_birth"
                                    value={ editedUser.date_of_birth }
                                    onChange={ handleInputChange }
                                    placeholder={ user.date_of_birth.slice(0, 10) || "Enter YYYY-MM-DD" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Gender:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gender"
                                    value={ editedUser.gender !== undefined ? editedUser.gender : (user.gender !== "" ? user.gender : "Select Gender") }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Street:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="street"
                                    value={ editedUser.street }
                                    onChange={ handleInputChange }
                                    placeholder={ user.street || "Enter Street" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">City:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="city"
                                    value={ editedUser.city }
                                    onChange={ handleInputChange }
                                    placeholder={ user.city || "Enter City" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">State/Province:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="stateProvince"
                                    value={ editedUser.stateProvince }
                                    onChange={ handleInputChange }
                                    placeholder={ user.stateProvince || "Enter State/Province" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Zip Code:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="zipCode"
                                    value={ editedUser.zipCode }
                                    onChange={ handleInputChange }
                                    placeholder={ user.zipCode || "Enter Zip Code" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Country:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="country"
                                    value={ editedUser.country }
                                    onChange={ handleInputChange }
                                    placeholder={ user.country || "Enter Country" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Email:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="email"
                                    value={ editedUser.email }
                                    onChange={ handleInputChange }
                                    placeholder={ user.email || "Enter Email" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Phone Number:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="phoneNumber"
                                    value={ editedUser.phoneNumber }
                                    onChange={ handleInputChange }
                                    placeholder={ user.phoneNumber || "Enter Phone Number" }
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

export default EditProfile;
