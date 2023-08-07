const PasswordNote = ({
    isLoading, }) => {

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex justify-center items-center min-h-full">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6 mt-6">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">NOTICE</h1>
                        <div className="mb-8">
                            <p className="text-lg font-semibold text-green-600 mb-4 text-center">Your change password request has been successfully sent!</p>
                            <p className="text-center">Please wait for 1-3 days to process your account.</p>
                            <p className="text-center">If left unnoticed, please contact the school either online or face-to-face.</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Contacts:</p>
                            <p>Email: bbiabooks@gmail.com</p>
                            <p>Phone: +63 991 5034 755</p>
                        </div>
                        <div className="mb-4 pb-4 border-b border-gray-300">
                            <p className="text-base font-semibold">Address:</p>
                            Angeles City, Pampanga
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordNote;
