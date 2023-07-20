"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const UserProfile = ({
    user,
    handleDashboard,
    isLoading, }) => {

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading User Details . . .</p>
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
                    onClick={ handleDashboard }
                >
                    <Image
                        src="/back.svg"
                        alt="Back to Dashboard"
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
                        <h1 className="text-2xl font-bold text-center mb-4 border-b border-gray-300">User Details</h1>
                        <div className="flex justify-center items-center mb-2">
                            <Image
                                src={ user.idPhoto ? user.idPhoto : "/id-photo.svg" }
                                alt="ID Photo"
                                width={ 500 }
                                height={ 500 }
                                className="object-cover rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">User Type:</p> { user.userType.userType }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Branch:</p> { user.branch ? user.branch.branch : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Subject Area:</p> { user.subjectArea ? user.subjectArea.subjectArea : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Grade Level:</p> { user.gradeLevel ? user.gradeLevel.gradeLevel : "N/A" }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Username:</p> { user.username }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">First Name:</p> { user.firstName }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Last Name:</p> { user.lastName }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date of Birth:</p> { user.date_of_birth.slice(0, 10) }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Gender:</p> { user.gender }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Street:</p> { user.street }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">City:</p> { user.city }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">State/Province:</p> { user.stateProvince }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Zip Code:</p> { user.zipCode }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Country:</p> { user.country }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Email:</p> { user.email }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Phone Number:</p> { user.phoneNumber }
                        </div>
                        <div className="mb-4">
                            <p className="text-base font-semibold">Date Registered:</p> { new Date(user.dateRegistered).toLocaleString() }
                        </div>
                        <div className="mb-4 border-b border-gray-300">
                            <p className="text-base font-semibold">Date Last Updated:</p> { new Date(user.updatedAt).toLocaleString() }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
