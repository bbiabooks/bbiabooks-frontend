const ConfirmationModal = ({ warning, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <p className="mb-4 text-red-400 font-semibold text-2xl">{ warning }</p>
                    <p className="mb-4">{ message }</p>
                    <div className="flex justify-end space-x-2">
                        { onCancel && (
                            <button
                                className="hover:bg-rose-400 text-center hover:text-white text-rose-400 font-bold py-2 px-4 rounded-full"
                                onClick={ onCancel }
                            >
                                Cancel
                            </button>
                        ) }
                        <button
                            className="bg-cyan-700 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded-full"
                            onClick={ onConfirm }
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
