import ConfirmationModal from "@components/main/ConfirmationModal";
import Image from "next/image";

const OrderDetails = ({
    order,
    handleOrderList,
    isDeleting,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleEditOrder,
    handleDeleteOrder,
    handleConfirmDelete,
    handleCancelDelete, }) => {

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
                    onClick={ handleOrderList }
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
                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">Order Details</h1>
                        <div className="flex justify-center items-center mb-2">
                            <Image
                                src={ order.book.coverImage ? order.book.coverImage : "/book.svg" }
                                alt="Book Cover"
                                width={ 500 }
                                height={ 500 }
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Book Title:</p> { order.book ? order.book.title : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Purchase Price:</p> ₱ { order.book ? order.book.purchasePrice : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Supplier:</p> { order.book.supplier ? order.book.supplier.supplier : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Ordered By:</p>
                            {
                                order.user_id ?
                                    (order.user_id.firstName + " " + order.user_id.lastName + " (" + order.user_id.userType.userType + ")")
                                    : "N/A"
                            }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Reserved For:</p>
                            {
                                order.reservedFor ?
                                    (order.reservedFor.firstName + " " + order.reservedFor.lastName + " (" + order.reservedFor.userType.userType + ", "
                                        + (order.reservedFor.subjectArea ? order.reservedFor.subjectArea.subjectArea
                                            : (order.reservedFor.gradeLevel ? order.reservedFor.gradeLevel.gradeLevel : "N/A")) + ")")
                                    : "N/A"
                            }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Order Status:</p> { order.orderStatus }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Payment Status:</p> { order.paymentStatus }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Payment Method:</p> { order.paymentMethod }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Proof of Payment:</p>
                            { order.paymentMethod === "cash" ?
                                <div className="flex justify-center items-center mb-2">
                                    <Image
                                        src="/cash.svg"
                                        alt="Cash"
                                        width={ 250 }
                                        height={ 250 }
                                        className="object-cover rounded"
                                    />
                                </div>
                                :
                                <div className="flex justify-center items-center mb-2">
                                    <Image
                                        src={ order.proofOfPayment ? order.proofOfPayment : "/cash.svg" }
                                        alt="Cash"
                                        width={ 250 }
                                        height={ 250 }
                                        className="object-cover rounded"
                                    />
                                </div>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Arrival Date:</p> { order.arrivalDate.slice(0, 10) }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Ordered At:</p> { new Date(order.createdAt).toLocaleString() }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Last Updated:</p> { new Date(order.updatedAt).toLocaleString() }
                        </div>
                        <div className="border-t pt-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 space-x-0 sm:space-x-2">
                            <button
                                className="hover:bg-rose-400 text-center hover:text-white text-rose-400 font-bold py-2 px-4 rounded-full"
                                disabled={ isDeleting }
                                onClick={ () => handleDeleteOrder(order._id) }
                            >
                                { isDeleting ? "Deleting..." : "Delete Order" }
                            </button>
                            <button
                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                    } text-white font-bold py-2 px-4 rounded-full` }
                                disabled={ isLoading }
                                onClick={ () => handleEditOrder(order._id) }
                            >
                                { isLoading ? "Please wait..." : "Update Order Status" }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            { isConfirmationModalOpen && (
                <ConfirmationModal
                    warning={ warningMessage }
                    message={ confirmMessage }
                    onConfirm={ handleConfirmDelete }
                    onCancel={ handleCancelDelete }
                />
            ) }
        </div>
    );
};

export default OrderDetails;
