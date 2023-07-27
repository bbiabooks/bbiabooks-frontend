import Image from "next/image";

const ReportDetails = ({
    report,
    handleReportList,
    isLoading, }) => {

    if (!report) {
        return (
            <div className="min-h-screen p-12">
                <p className="text-gray-500 text-2xl font-semibold">Loading Report Details . . .</p>
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
                    onClick={ handleReportList }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Reports"
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
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">Report Details</h1>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Track Number:</p> { report._id }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Activity Made:</p> { report.action }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">User Type:</p> { report.user_id.userType ? report.user_id.userType.userType : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Username:</p> { report.user_id.username }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">First Name:</p> { report.user_id.firstName }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Last Name:</p> { report.user_id.lastName }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Subject Area:</p> { report.user_id.subjectArea ? report.user_id.subjectArea.subjectArea : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Grade Level:</p> { report.user_id.gradeLevel ? report.user_id.gradeLevel.gradeLevel : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Branch:</p> { report.user_id.branch ? report.user_id.branch.branch : "N/A" }
                        </div>
                        <div className="mb-4 border-b border-gray-300">
                            <p className="text-base font-semibold">Timestamp:</p> { new Date(report.createdAt).toLocaleString() }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;
