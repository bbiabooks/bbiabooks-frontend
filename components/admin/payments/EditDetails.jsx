import Image from "next/image";

const EditDetails = ({
    order,
    paymentStatus,
    paymentMethod,
    editedOrder,
    isLoading,
    handleViewOrder,
    handleInputChange,
    handleFileChange,
    handleSubmit }) => {

    if (!order) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading Order Details . . .</p>
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
                    onClick={ () => handleViewOrder(order._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Orders"
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
                                Update Payment Status
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Order ID:</p> { order._id }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Order Status:</p> { order.orderStatus }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Payment Status:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="paymentStatus"
                                    value={ editedOrder.paymentStatus !== undefined
                                        ? editedOrder.paymentStatus
                                        : order.paymentStatus !== undefined && order.paymentStatus !== ""
                                            ? order.paymentStatus
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Payment Method</option>
                                    { paymentStatus.map((paymentStatus) => {
                                        return (
                                            <option key={ paymentStatus } value={ paymentStatus }>
                                                { paymentStatus }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Payment Method:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="paymentMethod"
                                    value={ editedOrder.paymentMethod !== undefined
                                        ? editedOrder.paymentMethod
                                        : order.paymentMethod !== undefined && order.paymentMethod !== ""
                                            ? order.paymentMethod
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Payment Method</option>
                                    { paymentMethod.map((paymentMethod) => {
                                        return (
                                            <option key={ paymentMethod } value={ paymentMethod }>
                                                { paymentMethod }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="flex justify-center items-center mb-2">
                                <Image
                                    src={ order.proofOfPayment ? order.proofOfPayment : "/cash.svg" }
                                    alt="Proof of Payment"
                                    width={ 500 }
                                    height={ 500 }
                                    className="object-cover rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Update Proof of Payment:</p>
                                <input
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    type="file"
                                    name="proofOfPayment"
                                    onChange={ handleFileChange }
                                />
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? "Updating..." : "Update Payment Status" }
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
