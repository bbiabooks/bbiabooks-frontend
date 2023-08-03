import Image from "next/image";

const CreateDetails = ({
    userData,
    isLoading,
    userTypes,
    branches,
    subjectAreas,
    gradeLevels,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleUserList }) => {

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    // Function to handle user type change
    const handleUserTypeChange = (event) => {
        const selectedUserType = event.target.value;

        // Find the "N/A" option in subjectAreas array
        const subjectAreaNAOption = subjectAreas.find((area) => area.subjectArea === "N/A");

        // Find the "N/A" option in gradeLevels array
        const gradeLevelNAOption = gradeLevels.find((level) => level.gradeLevel === "N/A");

        // Set subjectArea to N/A option and disable it if userType is Teacher
        if (selectedUserType === "Teacher") {
            handleInputChange({
                target: {
                    name: "subjectArea",
                    value: subjectAreaNAOption ? subjectAreaNAOption._id : "", // If "N/A" option not found, fallback to empty string
                },
            });

            // Reset gradeLevel when switching to Teacher user type
            handleInputChange({
                target: { name: "gradeLevel", value: "" },
            });
        } else {
            // Set gradeLevel to N/A option and disable it if userType is not Teacher
            handleInputChange({
                target: {
                    name: "gradeLevel",
                    value: gradeLevelNAOption ? gradeLevelNAOption._id : "", // If "N/A" option not found, fallback to empty string
                },
            });

            // Reset subjectArea when switching to non-Teacher user types
            handleInputChange({
                target: { name: "subjectArea", value: "" },
            });
        }

        // Update the userType field
        handleInputChange(event);
    };

    // Helper function to check if the selected user type is Teacher
    const isTeacher = (userType) => {
        const teacherUserTypeIds = userTypes.filter(
            (type) => type.userType === "Teacher" || type.userType === "Admin" || type.userType === "Librarian" || type.userType === "Accountant"
        ).map((type) => type._id);
        return teacherUserTypeIds.includes(userType);
    };

    // Helper function to check if the selected user type is Student
    const isStudent = (userType) => {
        const studentUserTypeIds = userTypes.filter(
            (type) => type.userType === "Student" || type.userType === "Admin" || type.userType === "Librarian" || type.userType === "Accountant"
        ).map((type) => type._id);
        return studentUserTypeIds.includes(userType);
    };

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
                        <form onSubmit={ handleSubmit }>
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Create User Details
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">User Type: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="userType"
                                    value={ userData.userType || "" }
                                    onChange={ handleUserTypeChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select User Type
                                    </option>
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
                                <p className="text-base font-semibold">Branch: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="branch"
                                    value={ userData.branch || "" }
                                    onChange={ handleInputChange }
                                    required
                                >
                                    <option value="" disabled>
                                        Select Branch
                                    </option>
                                    { branches.map((branch) => {
                                        return (
                                            <option key={ branch._id } value={ branch._id }>
                                                { branch.branch }
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
                                    value={ userData.subjectArea || "" }
                                    onChange={ handleInputChange }
                                    disabled={ isStudent(userData.userType) } // Disable if userType is Student
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
                                <p className="text-base font-semibold">Grade Level:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gradeLevel"
                                    value={ userData.gradeLevel || "" }
                                    onChange={ handleInputChange }
                                    disabled={ isTeacher(userData.userType) } // Disable if userType is Teacher
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
                                <p className="text-base font-semibold">First Name: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="firstName"
                                    value={ userData.firstName }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter First Name" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Middle Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="middleName"
                                    value={ userData.middleName }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Middle Name" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Last Name: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="lastName"
                                    value={ userData.lastName }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Last Name" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Date of Birth: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="date_of_birth"
                                    value={ userData.date_of_birth }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter YYYY-MM-DD" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Gender: <span className="text-red-500">*</span></p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="gender"
                                    value={ userData.gender || "" }
                                    onChange={ handleInputChange }
                                    required
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
                                    value={ userData.street }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Street" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">City: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="city"
                                    value={ userData.city }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter City" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">State/Province: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="stateProvince"
                                    value={ userData.stateProvince }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter State/Province" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Zip Code: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="zipCode"
                                    value={ userData.zipCode }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Zip Code" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Country: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="country"
                                    value={ userData.country }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Country" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Email: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="email"
                                    value={ userData.email }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter Email" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Phone Number: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="phoneNumber"
                                    value={ userData.phoneNumber }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter 11-Digit 09xxxxxxxxx" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">ID Photo: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="file"
                                    name="idPhoto"
                                    onChange={ handleFileChange }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Username: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="username"
                                    value={ userData.username }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter 8-Character Username" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Password: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="password"
                                    value={ userData.password }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter 8-Character Password" }
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
                                    { isLoading ? 'Creating...' : 'Create User' }
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
