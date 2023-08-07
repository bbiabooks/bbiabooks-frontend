const CreateDetails = ({
    passwordData,
    isLoading,
    handleInputChange,
    handleSubmit, }) => {

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center min-h-full">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 mt-6 w-full max-w-lg flex justify-center items-center">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        <form onSubmit={ handleSubmit } className="w-full">
                            <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">
                                Forgot Password? Fill up to create new.
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Existing Username: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="username"
                                    value={ passwordData.username }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter your existing Username" }
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">New Password: <span className="text-red-500">*</span></p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="password"
                                    value={ passwordData.password }
                                    onChange={ handleInputChange }
                                    placeholder={ "Enter your New 8-character Password" }
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
                                    { isLoading ? 'Please wait...' : 'Request Change Password' }
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
