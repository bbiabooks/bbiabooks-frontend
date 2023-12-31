import Image from "next/image";

const OrderDetails = ({
    order,
    handleOrderList,
    isLoading, }) => {

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function isSaturday() {
        const currentDate = new Date();
        return currentDate.getDay() === 6; // 6 indicates Saturday
    }

    function isWeekday() {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        return dayOfWeek >= 1 && dayOfWeek <= 5; // 1 (Monday) to 5 (Friday) indicate weekdays
    }

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
        <div className="min-h-screen m-12">
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
                                src={ order.book && (order.book.coverImage || order.book.coverImage === null) ? order.book.coverImage : "/book.svg" }
                                alt="Book Cover"
                                width={ 250 }
                                height={ 250 }
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mb-4 mt-4">
                            <p className="text-base font-semibold">Notice:</p>
                            { order.arrivalDate.slice(0, 10) === order.createdAt.slice(0, 10) ? (
                                <p className="text-base font-semibold text-green-600">
                                    { isWeekday()
                                        ? "Your order is already available and is ready to pick up."
                                        : isSaturday()
                                            ? "Your order is already available but you can pick it up by Monday since today is Saturday"
                                            : "Your order is already available but you can pick it up by Monday since today is Sunday" }
                                </p>
                            ) : order.arrivalDate.slice(0, 10) < getCurrentDate() ? (
                                <p className="text-base font-semibold text-red-600">
                                    { `Your order is already available but wasn't picked up yet. Please pick up your order as soon as possible.` }
                                </p>
                            ) : <p className="text-base font-semibold text-rose-400">
                                { `Your order is expected to be available on or before ${order.arrivalDate.slice(0, 10)}. Please wait for the Librarian to contact you.` }</p>
                            }
                        </div>
                        <div className="mb-4 mt-8">
                            <p className="text-base font-semibold">Book Title:</p> { order.book.title }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Purchase Price:</p> ₱ { order.book.purchasePrice }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Order Quantity:</p> { order.quantity }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Supplier:</p> { order.book.supplier.supplier }
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
                            <p className="text-base font-semibold">Status Last Updated:</p> { new Date(order.updatedAt).toLocaleString() }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
