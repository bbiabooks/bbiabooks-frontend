import Image from "next/image";

const EditDetails = ({
    supplier,
    editedSupplier,
    isLoading,
    handleViewSupplier,
    handleInputChange,
    handleSubmit }) => {

    if (!supplier) {
        return (
            <div className="min-h-screen p-12">
                <p className="text-gray-500 text-2xl font-semibold">Loading Supplier Details . . .</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen p-12">
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
                    onClick={ () => handleViewSupplier(supplier._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Supplier"
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
                                Edit Supplier Details
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Supplier Name:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="supplier"
                                    value={ editedSupplier.supplier }
                                    onChange={ handleInputChange }
                                    placeholder={ supplier.supplier || "Enter Supplier Name" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Address:</p>
                                <textarea
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="address"
                                    value={ editedSupplier.address }
                                    onChange={ handleInputChange }
                                    placeholder={ supplier.address || "Enter Address" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Email:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="email"
                                    value={ editedSupplier.email }
                                    onChange={ handleInputChange }
                                    placeholder={ supplier.email || "Enter Email" }
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Phone Number:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="text"
                                    name="phoneNumber"
                                    value={ editedSupplier.phoneNumber }
                                    onChange={ handleInputChange }
                                    placeholder={ supplier.phoneNumber || "Enter Phone Number" }
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
        </div >
    );
};

export default EditDetails;
