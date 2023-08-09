import Link from "next/link";
import Image from "next/image";

const HelpAndPolicies = ({ isLoading, userKey }) => {
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
                <Link href="/admin/admin-pages">
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
            <div className="overflow-y-auto max-h-[calc(100vh-15vh)] flex-grow">

                {/* Administrator User Guide */ }
                <div className={ `${userKey === "Admin" ? "mb-12 flex justify-start flex-col" : "hidden"}` }>
                    <h1 className="text-2xl font-bold text-start mb-4">
                        ADMINISTRATOR USER GUIDE:
                    </h1>
                    <div className="px-4 max-w-4xl bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>Instructions:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Administrators have full control over the system. Can perform administrative tasks such as adding, updating, and deleting records related to branches, suppliers, subject areas, grade levels, books, users, ordered books, and borrowed books.</li>
                                <li>Access the Dashboard to view all activities, generate reports, and monitor user logs.</li>
                                <li>Use the User Accounts and Information Page to manage user records.</li>
                            </ul>
                            <p>
                                <strong>Limitations:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Admins cannot add new books, as it is one of the librarian's responsibilities.</li>
                                <li>Exercise caution while performing administrative tasks, as some actions may have irreversible consequences.</li>
                                <li>Avoid sharing login credentials with unauthorized users to maintain system security.</li>
                            </ul>
                            <p>
                                <strong>Helps and Contacts:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>If you encounter any issues or need assistance and changes, contact the IT support team at <strong>support@bbia-system.com</strong> or call <strong>(123) 456-7890</strong>.</li>
                            </ul>
                            <p className="pb-4">
                                <strong>Note:</strong> Remember to keep your login credentials confidential and report any suspicious activities immediately to maintain the system's security and integrity. Enjoy using the BBIA Inventory System!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Librarian User Guide */ }
                <div className={ `${userKey === "Librarian" ? "mb-12 flex justify-start flex-col" : "hidden"}` }>
                    <h1 className="text-2xl font-bold text-start mb-4">
                        LIBRARIAN USER GUIDE:
                    </h1>
                    <div className="px-4 max-w-4xl bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>Instructions:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Librarians can manage book-related activities. Add new books to the inventory, process book orders, and update borrow statuses.</li>
                                <li>Order and borrow book through Catalogue in behalf of the user for walk-ins.</li>
                                <li>Access the Book Inventory to view book records, monitor critical stocks, and add new stocks.</li>
                            </ul>
                            <p>
                                <strong>Limitations:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Librarians cannot perform administrative tasks or access user management features.</li>
                                <li>Librarians cannot access payments page but can oversee the payment status on orders page.</li>
                            </ul>
                            <p>
                                <strong>Helps and Contacts:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>For any queries or concerns, contact the Admin or reach out to the IT support team at <strong>support@bbia-system.com</strong>.</li>
                            </ul>
                            <p className="pb-4">
                                <strong>Note:</strong> Remember to keep your login credentials confidential and report any suspicious activities immediately to maintain the system's security and integrity. Enjoy using the BBIA Inventory System!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Accountant User Guide */ }
                <div className={ `${userKey === "Accountant" ? "mb-12 flex justify-start flex-col" : "hidden"}` }>
                    <h1 className="text-2xl font-bold text-start mb-4">
                        ACCOUNTANT USER GUIDE:
                    </h1>
                    <div className="px-4 max-w-4xl bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>Instructions:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Accountants are responsible for updating payment statuses for students/teachers.</li>
                                <li>Use the Payment Page to view, update, and generate payment records.</li>
                            </ul>
                            <p>
                                <strong>Limitations:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Accountants do not have access to administrative or book management features.</li>
                            </ul>
                            <p>
                                <strong>Helps and Contacts:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>For assistance, contact the Admin or email <strong>support@bbia-system.com</strong>.</li>
                            </ul>
                            <p className="pb-4">
                                <strong>Note:</strong> Remember to keep your login credentials confidential and report any suspicious activities immediately to maintain the system's security and integrity. Enjoy using the BBIA Inventory System!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Moderators User Guide */ }
                <div className="mb-12 flex justify-start flex-col">
                    <h1 className="text-2xl font-bold text-start mb-4">
                        TERMS AND CONDITIONS OF USE
                    </h1>
                    <div className="px-4 min-w-full bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>Access and Use:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>The "BBIA Library System" is accessible to registered users who agree to abide by these terms.</li>
                                <li>Unauthorized access or use of the System is prohibited.</li>
                            </ul>
                            <p>
                                <strong>User Responsibilities:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users are responsible for using the System in a lawful and responsible manner.</li>
                                <li>Users must respect intellectual property rights and not engage in any form of copyright infringement.</li>
                                <li>Compliance with System rules and guidelines is required for all users.</li>
                            </ul>
                            <p>
                                <strong>Privacy:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>User data is collected during registration and usage to enhance System functionality.</li>
                                <li>Refer to the Privacy Policy for comprehensive details on data collection, usage, and protection.</li>
                            </ul>
                            <p>
                                <strong>Intellectual Property:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>In cases of legitimate copyright concerns, the System will take appropriate action, which may include the removal of infringing content or the suspension of user accounts involved in repeated violations.</li>
                            </ul>
                            <p>
                                <strong>Termination:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users found to be engaging in activities that compromise the integrity of the System or infringe upon the rights of others will face consequences, including potential legal actions.</li>
                            </ul>
                            <p>
                                <strong>Disclamer:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>The System provides information on an "as-is" basis and makes no guarantees of accuracy or availability.</li>
                                <li>The System is not liable for any damages resulting from its use.</li>
                            </ul>
                            <p>
                                <strong>Changes to Terms:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Any updates or revisions to the terms of use will be readily available on the "BBIA Inventory System" website under the "Terms and Conditions" section upon clicking "Help and Policies" on side bar.</li>
                                <li>Users are encouraged to periodically visit the terms and conditions page to review any modifications.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* User Policies and Rules */ }
                <div className="mb-12 flex justify-start flex-col">
                    <h1 className="text-2xl font-bold text-start mb-4">
                        BBIA LIBRARY SYSTEM'S PRIVACY POLICY:
                    </h1>
                    <div className="px-4 min-w-full bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>Information Collection:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>User information collected includes registration data, usage logs, and preferences.</li>
                                <li>Collected data is used to enhance user experience and System functionality.</li>
                            </ul>
                            <p>
                                <strong>Data Sharing:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>User data will not be shared with third parties without explicit consent, except as required by law.</li>
                            </ul>
                            <p>
                                <strong>Data Security:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Measures such as encryption and access controls are implemented to protect user data.</li>
                                <li>Data breaches will be promptly reported to affected users and authorities.</li>
                            </ul>
                            <p>
                                <strong>User Rights:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users can access or modify their personal information through their account profile.</li>
                            </ul>
                            <p>
                                <strong>Legal Bases:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>User data is collected based on consent provided during registration.</li>
                            </ul>
                            <p>
                                <strong>Retention Period:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>User data will be retained as long as necessary to fulfill System purposes.</li>
                            </ul>
                            <p>
                                <strong>Note:</strong> By using the BBIA Inventory System, users agree to abide by these policies and rules. Failure to comply may result in consequences, including legal actions in case of serious violations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Library Policies and Rules */ }
                <div className="mb-12 flex justify-start flex-col">
                    <h1 className="text-2xl font-bold text-start mb-4">
                        BBIA LIBRARY USER AGREEMENT:
                    </h1>
                    <div className="px-4 min-w-full bg-white rounded-lg shadow-lg p-6">
                        <div>
                            <p>
                                <strong>User Eligibility:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Access to the "BBIA Library System" is available to individuals who meet the eligibility criteria established by the System.</li>
                            </ul>
                            <p>
                                <strong>User Benefits:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users have the privilege to borrow resources from the library and also order books from the book catalogue, providing access to a diverse range of reading materials.</li>
                            </ul>
                            <p>
                                <strong>Borrowing and Returns:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Users are allowed to borrow books based on borrowing limits and lending periods. This approach ensures equitable access to the collection while promoting responsible utilization. To avoid late fees or penalties, timely returns are essential.</li>
                                <li>Damaged or lost borrowed book must be reported directly to the library in face-to-face manner.</li>
                            </ul>
                            <p>
                                <strong>Late Fees and Penalties:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>A late fee of 10 pesos per week will be enforced for books that are returned past their due date.</li>
                                <li>Users will be charged the cost of the book for items that are damaged or lost.</li>
                            </ul>
                            <p>
                                <strong>Inventory Management Policy:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Books will be categorized and labeled for efficient organization.</li>
                                <li>Book details, including descriptions and attributes, will be stored in the inventory database.</li>
                                <li>Users can check book availability through the System's interface.</li>
                                <li>Availability may vary based on user status and book type.</li>
                                <li>Users can reserve items in advance, subject to availability.</li>
                                <li>Unclaimed reservations may lead to forfeiture of reserved items.</li>
                            </ul>
                            <p>
                                <strong>Maintenance and Repairs:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Damaged books will be promptly assessed for repair or replacement.</li>
                                <li>Users are encouraged to report damaged books to facilitate prompt resolution.</li>
                            </ul>
                            <p>
                                <strong>Deaccessioning:</strong>
                            </p>
                            <ul className="list-disc list-inside pb-4">
                                <li>Books will be removed from the inventory based on relevance, condition, availability, and alignment with the curriculum and educational goals.</li>
                                <li>Books no longer aligned with the curriculum may be returned to suppliers or publishers as per established procedures and agreements.</li>
                            </ul>
                            <p>
                                <strong>Note:</strong> By using the BBIA Inventory System, users agree to abide by these policies and rules. Failure to comply may result in consequences, including legal actions in case of serious violations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpAndPolicies;