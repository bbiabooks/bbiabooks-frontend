import Image from "next/image";
import ConfirmationModal from "@components/main/ConfirmationModal";

const OptionTabs = ({
    handleViewBranches,
    handleViewGradeLevels,
    handleViewSuppliers,
    handleViewSubjectAreas,
    handleCreateBranch,
    handleCreateGradeLevel,
    handleCreateSubjectArea,
    handleCreateSupplier,
    isLoading,
    isConfirmationModalOpen,
    warningMessage,
    confirmMessage,
    handleConfirm }) => {

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-col flex items-start justify-start min-h-full p-12 max-w-5xl">
            <div className="w-full">
                <h1 className="text-2xl font-black mb-4">Field Options</h1>
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div
                            className="border rounded-lg flex flex-col justify-between bg-white shadow-lg"
                        >
                            <button
                                disabled={ isLoading }
                                className={ `py-16 rounded-t-lg flex items-center justify-center bg-gray-200 text-gray-500 ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-300 hover:text-gray-800"}` }
                                onClick={ handleCreateBranch }
                            >
                                <p className="text-lg font-semibold mb-1">+ Add New</p>
                            </button>
                            <div className="flex flex-row items-center justify-between p-4">
                                <h2 className="text-sm font-bold mb-1">Branches</h2>
                                <button
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold p-2 rounded-full` }
                                    onClick={ handleViewBranches }
                                >
                                    <Image
                                        src="/view-page.svg"
                                        alt="View Branches"
                                        width={ 12 }
                                        height={ 12 }
                                        className="object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className="border rounded-lg flex flex-col justify-between bg-white shadow-lg"
                        >
                            <button
                                disabled={ isLoading }
                                className={ `py-16 rounded-t-lg flex items-center justify-center bg-gray-200 text-gray-500 ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-300 hover:text-gray-800"}` }
                                onClick={ handleCreateSupplier }
                            >
                                <p className="text-lg font-semibold mb-1">+ Add New</p>
                            </button>
                            <div className="flex flex-row items-center justify-between p-4">
                                <h2 className="text-sm font-bold mb-1">Suppliers</h2>
                                <button
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold p-2 rounded-full` }
                                    onClick={ handleViewSuppliers }
                                >
                                    <Image
                                        src="/view-page.svg"
                                        alt="View Suppliers"
                                        width={ 12 }
                                        height={ 12 }
                                        className="object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className="border rounded-lg flex flex-col justify-between bg-white shadow-lg"
                        >
                            <button
                                disabled={ isLoading }
                                className={ `py-16 rounded-t-lg flex items-center justify-center bg-gray-200 text-gray-500 ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-300 hover:text-gray-800"}` }
                                onClick={ handleCreateGradeLevel }
                            >
                                <p className="text-lg font-semibold mb-1">+ Add New</p>
                            </button>
                            <div className="flex flex-row items-center justify-between p-4">
                                <h2 className="text-sm font-bold mb-1">Grade Levels</h2>
                                <button
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold p-2 rounded-full` }
                                    onClick={ handleViewGradeLevels }
                                >
                                    <Image
                                        src="/view-page.svg"
                                        alt="View Grade Levels"
                                        width={ 12 }
                                        height={ 12 }
                                        className="object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className="border rounded-lg flex flex-col justify-between bg-white shadow-lg"
                        >
                            <button
                                disabled={ isLoading }
                                className={ `py-16 rounded-t-lg flex items-center justify-center bg-gray-200 text-gray-500 ${isLoading ? "cursor-not-allowed" : "hover:bg-gray-300 hover:text-gray-800"}` }
                                onClick={ handleCreateSubjectArea }
                            >
                                <p className="text-lg font-semibold mb-1">+ Add New</p>
                            </button>
                            <div className="flex flex-row items-center justify-between p-4">
                                <h2 className="text-sm font-bold mb-1">Subject Areas</h2>
                                <button
                                    disabled={ isLoading }
                                    className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                        } text-white font-bold p-2 rounded-full` }
                                    onClick={ handleViewSubjectAreas }
                                >
                                    <Image
                                        src="/view-page.svg"
                                        alt="View Subject Areas"
                                        width={ 12 }
                                        height={ 12 }
                                        className="object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { isConfirmationModalOpen && (
                <ConfirmationModal
                    warning={ warningMessage }
                    message={ confirmMessage }
                    onConfirm={ handleConfirm }
                />
            ) }
        </div>
    );
};

export default OptionTabs;
