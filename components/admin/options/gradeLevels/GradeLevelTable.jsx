"use client";
import { useState } from "react";
import Image from "next/image";

const GradeLevelTable = ({
    handleViewOptions,
    handleCreateGradeLevel,
    handleViewGradeLevel,
    gradeLevels,
    isLoading }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGradeLevels = gradeLevels.filter((gradeLevelV) => {
        const { gradeLevel } = gradeLevelV;

        return gradeLevel.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="flex-grow flex items-start justify-center w-full min-h-full">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-6 flex justify-start">
                    Grade Levels
                </h1>
                <div className="flex flex-row justify-start">
                    <button
                        disabled={ isLoading }
                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                            } text-white font-bold py-2 px-4 rounded-full flex space-x-2 mr-2` }
                        onClick={ handleViewOptions }
                    >
                        <Image
                            src="/back.svg"
                            alt="Back to Options"
                            width={ 25 }
                            height={ 25 }
                            className="object-contain"
                        />
                        <p>Back</p>
                    </button>
                    <button
                        disabled={ isLoading }
                        className={ `${isLoading ? "cursor-not-allowed" : "hover:bg-cyan-700 hover:text-white"
                            } border border-cyan-700 text-cyan-700 font-bold py-2 px-4 rounded-full` }
                        onClick={ handleCreateGradeLevel }
                    >
                        Create New Grade Level
                    </button>
                </div>
                <div className="flex flex-col items-end space-x-2 text-cyan-600 opacity-70 hover:opacity-100 mb-4">
                    <div className="flex justify-end">
                        <p className="text-sm font-bold text-gray-600">
                            Total Grade Levels: { filteredGradeLevels.length }
                        </p>
                    </div>
                    <div className="flex items-center w-96">
                        <input
                            type="text"
                            id="search"
                            value={ searchTerm }
                            onChange={ handleSearch }
                            className="ml-2 border-b border-gray-600 px-3 py-2 w-full focus:outline-none bg-transparent"
                            placeholder="Search by: name"
                        />
                        <Image
                            src="/search.svg"
                            alt="Search"
                            width={ 20 }
                            height={ 20 }
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-25vh)]">
                    <table className="table-auto rounded-lg overflow-hidden shadow-lg w-full text-sm">
                        <thead>
                            <tr className="bg-cyan-900">
                                <th className="px-4 py-2 text-white font-semibold">
                                    <div className="flex justify-start">Grade Level Name</div></th>
                                <th className="px-4 py-2 text-white font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            { filteredGradeLevels.map((gradeLevel) => (
                                <tr key={ gradeLevel._id }>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        { gradeLevel.gradeLevel }
                                    </td>
                                    <td className="border-t border-cyan-800 px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                disabled={ isLoading }
                                                className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                                                    } text-white font-bold py-2 px-4 rounded-md` }
                                                onClick={ () => handleViewGradeLevel(gradeLevel._id) }
                                            >
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GradeLevelTable;
