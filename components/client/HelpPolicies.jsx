import Link from "next/link";
import Image from "next/image";

const HelpAndPolicies = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className="min-h-screen p-12 flex justify-center items-center">
                <p className="text-gray-500 text-2xl font-semibold">Loading please wait . . .</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-12">
            <div className="flex justify-start mb-8">
                <Link href="/client/client-pages">
                    <button
                        disabled={ isLoading }
                        className={ `bg-cyan-700 ${isLoading ? "cursor-not-allowed" : "hover:bg-orange-300"
                            } text-white font-bold py-2 px-4 rounded-full flex space-x-2` }
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
                </Link>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-15vh)]">
                {/* Clients (Teachers & Students) User Guide */ }
                <div className="mb-12 flex justify-start flex-col">
                    <h1 className="text-2xl font-bold text-start mb-4">
                        Clients (Teachers & Students) User Guide:
                    </h1>
                    <div className="px-4 min-w-full bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>Instructions:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>
                                    You can browse the Book Catalogue to find available books for
                                    borrowing or ordering.
                                </li>
                                <li>Place book orders and borrow books through the Book Catalogue Page.</li>
                                <li>View own activity logs, personal profiles, track borrowing history, and order status.</li>
                            </ul>
                            <p>
                                <strong>Limitations:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>You cannot perform administrative or book management tasks.</li>
                                <li>Teachers cannot access student information, and students cannot access teacher information.</li>
                            </ul>
                            <p>
                                <strong>Helps and Contacts:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>For any questions or issues, contact the School Librarian or email support@bbia-system.com.</li>
                            </ul>
                            <p className="pb-4">
                                <strong>Note:</strong> Remember to keep your login credentials confidential and report any suspicious activities immediately to maintain the system's security and integrity. Enjoy using the BBIA Web-Based Book Inventory System!
                            </p>
                        </div>
                    </div>
                </div>

                {/* User Policies and Rules */ }
                <div className="mb-12 flex justify-start flex-col">
                    <h1 className="text-2xl font-bold text-start mb-4">
                        User Policies and Rules for Book Library System:
                    </h1>
                    <div className="px-4 min-w-full bg-white rounded-lg shadow-lg p-6">
                        <div>
                            {/* List of policies and rules */ }
                            <p>
                                <strong>User Authentication and Security:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Each user must have a unique login ID and password.</li>
                                <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
                                <li>Do not share your login information with others to prevent unauthorized access.</li>
                            </ul>
                            <p>
                                <strong>Authorized Access Only:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users should only access areas of the system relevant to their roles (e.g., administrators accessing administrative features).</li>
                                <li>Unauthorized access to sensitive information or functionalities is strictly prohibited.</li>
                            </ul>
                            <p>
                                <strong>Data Integrity and Accuracy:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users must ensure the accuracy and integrity of data entered into the system.</li>
                                <li>Avoid entering false or misleading information that could compromise the system's reliability.</li>
                            </ul>
                            <p>
                                <strong>Prohibited Actions:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users are prohibited from attempting to modify or delete system files, databases, or configurations.</li>
                                <li>Any form of hacking, data manipulation, or unauthorized intrusion into the system is strictly prohibited.</li>
                            </ul>
                            <p>
                                <strong>Responsible Use of Resources:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users should use the system resources responsibly to avoid overloading the server and causing performance issues.</li>
                                <li>Avoid excessive data queries or operations that could impact system responsiveness.</li>
                            </ul>
                            <p>
                                <strong>Backup and Restoration:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Regularly backup important data and files to prevent data loss in case of system failures.</li>
                                <li>Contact the IT support team for assistance in data restoration, if needed.</li>
                            </ul>
                            <p>
                                <strong>Reporting Security Incidents:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users must report any security incidents or suspicious activities immediately to the IT support team.</li>
                                <li>Prompt reporting helps to address potential threats and vulnerabilities in a timely manner.</li>
                            </ul>
                            <p>
                                <strong>Respectful Communication:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users should communicate respectfully and professionally with other users within the system.</li>
                                <li>Avoid using offensive language or engaging in any form of harassment or discrimination.</li>
                            </ul>
                            <p>
                                <strong>Compliance with Policies and Regulations:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users are required to comply with all organization policies, procedures, and legal regulations related to system usage.</li>
                                <li>Failure to comply may result in disciplinary actions, including account suspension or termination.</li>
                            </ul>
                            <p>
                                <strong>System Updates and Maintenance:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users should be aware that the system may undergo periodic updates and maintenance.</li>
                                <li>Scheduled maintenance activities will be communicated in advance to minimize disruptions.</li>
                            </ul>
                            <p>
                                <strong>Logging and Monitoring:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>User activities within the system will be logged and monitored for security and auditing purposes.</li>
                                <li>Users must not attempt to alter or tamper with system logs.</li>
                            </ul>
                            <p>
                                <strong>Termination of Access:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Access to the system may be terminated if users violate policies, misuse the system, or engage in unauthorized activities.</li>
                            </ul>
                            <p>
                                <strong>Note:</strong> By using the BBIA Web-Based Book Inventory System, users agree to abide by these policies and rules. Failure to comply may result in consequences, including legal actions in case of serious violations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpAndPolicies;