import Image from "next/image";

const EditDetails = ({
    order,
    orderStatus,
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
        <div className="min-h-screen p-12">
            <div className="flex justify-start mb-4">
                <button
                    disabled={ isLoading }
                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                        } text-white font-bold py-2 px-4 rounded-full flex space-x-2` }
                    onClick={ () => handleViewOrder(order._id) }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Order"
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
                                Update Order Status
                            </h1>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Order ID:</p> { order._id }
                            </div>
                            <div className="mb-4">
                                <p className="text-base font-semibold">Order Status:</p>
                                <select
                                    className="border border-gray-300 px-3 py-2 mt-1 w-full rounded"
                                    name="orderStatus"
                                    value={ editedOrder.orderStatus !== undefined
                                        ? editedOrder.orderStatus
                                        : order.orderStatus !== undefined && order.orderStatus !== ""
                                            ? order.orderStatus
                                            : "" }
                                    onChange={ handleInputChange }
                                >
                                    <option value="" disabled>Select Order Status</option>
                                    { orderStatus.map((orderStatus) => {
                                        return (
                                            <option key={ orderStatus } value={ orderStatus }>
                                                { orderStatus }
                                            </option>
                                        );
                                    }) }
                                </select>
                            </div>
                            <div className="flex justify-end border-t pt-4">
                                <button
                                    type="submit"
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold py-2 px-4 rounded-full` }
                                >
                                    { isLoading ? "Updating..." : "Update Order Status" }
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
