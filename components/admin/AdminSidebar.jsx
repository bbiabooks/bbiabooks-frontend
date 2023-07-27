"use client";
import Image from 'next/image';
import Link from "next/link";
import ConfirmationModal from '@components/main/ConfirmationModal';
import { useAuthContext } from '@utils/AuthContext';
import { useEffect, useState } from 'react';
import { URL } from "@utils/URL";

const AdminSidebar = () => {
    const [user, setUser] = useState([]);
    const { logout, token, userKey, userId } = useAuthContext();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [clickedLink, setClickedLink] = useState("dashboard");
    const [showLinks, setShowLinks] = useState(false); // Add showLinks state
    const [isPrinting, setIsPrinting] = useState(false);

    const handleToggleLinks = () => {
        setShowLinks(!showLinks);
    };

    const handleHideLinks = () => {
        setShowLinks(false);
    };

    useEffect(() => {
        // Fetch all user from the backend API
        const fetchUser = async () => {
            try {
                const response = await fetch(`${URL}/api/users/${userId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch User");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchUser();
    }, [token, userKey, userId]);

    const handleLogout = () => {
        logout();
    };

    const handleUnauthorizedAction = () => {
        const warningMessage = `You are unauthorized to make this action as "${userKey}" . . .`;
        const confirmMessage = "FOR ANY CHANGE YOU WISHES, PLEASE CONTACT THE ADMIN IN CHARGE.";

        setWarningMessage(warningMessage);
        setConfirmMessage(confirmMessage);
        setIsConfirmationModalOpen(true);
    };

    const handleLinkClick = (link) => {
        setClickedLink(link);
    };

    const handleConfirm = () => {
        setIsConfirmationModalOpen(false);
    };

    return (
        <div className="flex flex-row min-h-full w-96">
            <div className="hide-print md:hidden fixed top-4 left-4 z-50 flex flex-row"> {/* Show this div on small screens only */ }
                <button
                    className="mr-2 mb-4 hover:text-orange-300 text-sm"
                    onClick={ handleToggleLinks } // Toggle the links when the button is clicked
                >
                    <div className="flex flex-row items-center space-x-2">
                        <Image
                            src="/menu.svg"
                            alt="Menu Button"
                            width={ 28 }
                            height={ 28 }
                            className="object-contain"
                        />
                    </div>
                </button>
                <div className="flex items-center justify-center mb-4">
                    <div>
                        <Image
                            src="/adminlogo.svg"
                            alt="BBIA logo"
                            width={ 28 }
                            height={ 28 }
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-xs text-cyan-600 font-bold ml-1">
                        Building Blocks International Academy Philippines
                    </h1>
                </div>
            </div>
            <div className={ `hidden md:flex ${showLinks ? "flex" : "hidden"}` }> {/* Show this div on medium screens and above, or when showLinks is true */ }
                <aside className="glassmorphism flex flex-col">
                    <div className="flex items-center justify-center py-2 mb-4 pb-6">
                        <div>
                            <Image
                                src="/adminlogo.svg"
                                alt="BBIA logo"
                                width={ 70 }
                                height={ 70 }
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-xs font-semibold ml-1">
                            Building Blocks International Academy Philippines
                        </h1>
                    </div>
                    <div>
                        <div className="flex-grow flex flex-col pl-1">
                            <div className="mt-4 pb-2">
                                <h2 className="text-gray-600 font-semibold mb-2 text-xs">PANEL</h2>
                                <div className="flex flex-col">
                                    { userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant" ? (
                                        <Link href="/admin/admin-pages">
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "dashboard" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("dashboard") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/dashboard.svg"
                                                        alt="Dashboard"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold">Dashboard</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/dashboard.svg"
                                                    alt="Dashboard"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold">Dashboard</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") ? (
                                        <Link
                                            href="/admin/admin-pages/books/catalogue"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "catalogue" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("catalogue") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/catalogue.svg"
                                                        alt="Catalogue"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Catalogue</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/catalogue.svg"
                                                    alt="Catalogue"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Catalogue</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/orders"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "orders" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("orders") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/orders.svg"
                                                        alt="Orders"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Orders</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/orders.svg"
                                                    alt="Orders"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Orders</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/loans"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "loans" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("loans") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/loans.svg"
                                                        alt="Loans"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Loans</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/loans.svg"
                                                    alt="Loans"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Loans</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Accountant") ? (
                                        <Link
                                            href="/admin/admin-pages/payments"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "payments" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("payments") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/payments.svg"
                                                        alt="Payments"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Payments</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/payments.svg"
                                                    alt="Payments"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Payments</span>
                                            </div>
                                        </button>
                                    ) }
                                </div>
                            </div>
                            <div className="mt-8 pb-2">
                                <h2 className="text-gray-600 font-semibold mb-2 text-xs">SETTINGS</h2>
                                <div className="flex flex-col">
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/options"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "options" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("options") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/options.svg"
                                                        alt="Options"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Options</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/options.svg"
                                                    alt="Options"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Options</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") ? (
                                        <Link
                                            href="/admin/admin-pages/users"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "users" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("users") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/users.svg"
                                                        alt="Users"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Users</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/users.svg"
                                                    alt="Users"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Users</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/books"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "books" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("books") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/books.svg"
                                                        alt="Books"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Books</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/books.svg"
                                                    alt="Books"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Books</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin") ? (
                                        <Link
                                            href="/admin/admin-pages/reports"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "reports" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("reports") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/reports.svg"
                                                        alt="Reports"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Reports</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/reports.svg"
                                                    alt="Reports"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Reports</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin") ? (
                                        <Link
                                            href="/admin/admin-pages/registration"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "registrations" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("registrations") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/register.svg"
                                                        alt="Registrations"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Registration</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/register.svg"
                                                    alt="Registrations"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Registration</span>
                                            </div>
                                        </button>
                                    ) }
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 py-2 pl-1 pr-5">
                            <div className="flex justify-between items-center">
                                { userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant" ? (
                                    <Link href={ `/admin/admin-pages/profile/${user._id}` }>
                                        <button
                                            className={ `bg-transparent p-4 flex flex-row items-center justify-between ${clickedLink === "userProfile" ? "opacity-100" : "opacity-70"
                                                }` }
                                            onClick={ () => handleLinkClick("userProfile") }
                                        >
                                            <Image
                                                src="/user-account.svg"
                                                alt="User Profile"
                                                width={ 50 }
                                                height={ 50 }
                                                className="object-contain"
                                            />
                                            <div className="flex flex-col opacity-80 hover:opacity-100">
                                                <p className="ml-2 font-bold text-sm flex justify-start">{ `${user.firstName} ${user.lastName}` }</p>
                                                <p className="ml-2 font-bold text-xs text-gray-500 flex justify-start">
                                                    { user.username }
                                                </p>
                                            </div>
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        className="mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                                        onClick={ handleUnauthorizedAction }
                                    >
                                        <Image
                                            src="/user-account.svg"
                                            alt="User Profile"
                                            width={ 50 }
                                            height={ 50 }
                                            className="object-contain"
                                        />
                                        <div className="flex flex-col hover:opacity-100">
                                            <p className="ml-2 font-bold text-sm flex justify-start">{ user.firstName + " " + user.lastName }</p>
                                            <p className="ml-2 font-bold text-xs text-gray-500 flex justify-start">{ "@" + user.username }</p>
                                        </div>
                                    </button>
                                ) }
                                <Link href="/admin/login">
                                    <button
                                        className="bg-cyan-700 hover:bg-orange-300 text-white font-bold p-2 rounded-full"
                                        onClick={ handleLogout }
                                    >
                                        <Image
                                            src="/logout.svg"
                                            alt="View Login"
                                            width={ 12 }
                                            height={ 12 }
                                            className="object-cover white-icon"
                                        />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            { showLinks && (
                <div
                    className="fixed top-12 left-8 z-50 md:hidden glassmorphism"
                    onClick={ handleHideLinks } // Hide the links when the overlay is clicked
                >
                    <div className="flex flex-col w-1/2">
                        <div className="flex-grow flex flex-col pl-1">
                            <div className="mt-4 pb-2">
                                <h2 className="text-gray-600 font-semibold mb-2 text-xs">PANEL</h2>
                                <div className="flex flex-col">
                                    { userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant" ? (
                                        <Link href="/admin/admin-pages">
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "dashboard" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("dashboard") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/dashboard.svg"
                                                        alt="Dashboard"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold">Dashboard</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/dashboard.svg"
                                                    alt="Dashboard"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold">Dashboard</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") ? (
                                        <Link
                                            href="/admin/admin-pages/books/catalogue"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "catalogue" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("catalogue") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/catalogue.svg"
                                                        alt="Catalogue"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Catalogue</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/catalogue.svg"
                                                    alt="Catalogue"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Catalogue</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/orders"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "orders" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("orders") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/orders.svg"
                                                        alt="Orders"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Orders</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/orders.svg"
                                                    alt="Orders"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Orders</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/loans"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "loans" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("loans") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/loans.svg"
                                                        alt="Loans"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Loans</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/loans.svg"
                                                    alt="Loans"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Loans</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Accountant") ? (
                                        <Link
                                            href="/admin/admin-pages/payments"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "payments" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("payments") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/payments.svg"
                                                        alt="Payments"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Payments</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/payments.svg"
                                                    alt="Payments"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Payments</span>
                                            </div>
                                        </button>
                                    ) }
                                </div>
                            </div>
                            <div className="mt-2">
                                <h2 className="text-gray-600 font-semibold mb-2 text-xs">SETTINGS</h2>
                                <div className="flex flex-col">
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/options"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "options" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("options") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/options.svg"
                                                        alt="Options"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Options</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/options.svg"
                                                    alt="Options"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Options</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant") ? (
                                        <Link
                                            href="/admin/admin-pages/users"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "users" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("users") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/users.svg"
                                                        alt="Users"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Users</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/users.svg"
                                                    alt="Users"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Users</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin" || userKey === "Librarian") ? (
                                        <Link
                                            href="/admin/admin-pages/books"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "books" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("books") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/books.svg"
                                                        alt="Books"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Books</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/books.svg"
                                                    alt="Books"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Books</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin") ? (
                                        <Link
                                            href="/admin/admin-pages/reports"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "reports" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("reports") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/reports.svg"
                                                        alt="Reports"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Reports</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/reports.svg"
                                                    alt="Reports"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Reports</span>
                                            </div>
                                        </button>
                                    ) }
                                    { (userKey === "Admin") ? (
                                        <Link
                                            href="/admin/admin-pages/registration"
                                        >
                                            <button
                                                className={ `mb-2 text-cyan-600 font-bold text-sm ${clickedLink === "registrations" ? "opacity-100" : "opacity-70"
                                                    }` }
                                                onClick={ () => handleLinkClick("registrations") }
                                            >
                                                <div className="flex flex-row items-center space-x-2 text-cyan-600 hover:text-orange-300">
                                                    <Image
                                                        src="/register.svg"
                                                        alt="Registrations"
                                                        width={ 25 }
                                                        height={ 25 }
                                                        className="object-contain"
                                                    />
                                                    <span className="mr-2 font-bold hover:text-orange-300 text-sm">Registration</span>
                                                </div>
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mb-2 text-cyan-600 font-bold text-sm opacity-70"
                                            onClick={ handleUnauthorizedAction }
                                        >
                                            <div className="flex flex-row items-center space-x-2 hover:text-orange-300">
                                                <Image
                                                    src="/register.svg"
                                                    alt="Registrations"
                                                    width={ 25 }
                                                    height={ 25 }
                                                    className="object-contain"
                                                />
                                                <span className="mr-2 font-bold hover:text-orange-300 text-sm">Registration</span>
                                            </div>
                                        </button>
                                    ) }
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            { userKey === "Admin" || userKey === "Librarian" || userKey === "Accountant" ? (
                                <Link href={ `/admin/admin-pages/profile/${user._id}` }>
                                    <button
                                        className={ `bg-transparent flex flex-row items-center justify-between ${clickedLink === "userProfile" ? "opacity-100" : "opacity-70"
                                            }` }
                                        onClick={ () => handleLinkClick("userProfile") }
                                    >
                                        <Image
                                            src="/user-account.svg"
                                            alt="User Profile"
                                            width={ 28 }
                                            height={ 28 }
                                            className="object-contain"
                                        />
                                        <div className="flex flex-col opacity-80 hover:opacity-100">
                                            <p className="ml-2 font-bold text-sm flex justify-start">{ `${user.firstName} ${user.lastName}` }</p>
                                            <p className="ml-2 font-bold text-xs text-gray-500 flex justify-start">
                                                { user.username }
                                            </p>
                                        </div>
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    className="mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                                    onClick={ handleUnauthorizedAction }
                                >
                                    <Image
                                        src="/user-account.svg"
                                        alt="User Profile"
                                        width={ 50 }
                                        height={ 50 }
                                        className="object-contain"
                                    />
                                    <div className="flex flex-col hover:opacity-100">
                                        <p className="ml-2 font-bold text-sm flex justify-start">{ user.firstName + " " + user.lastName }</p>
                                        <p className="ml-2 font-bold text-xs text-gray-500 flex justify-start">{ "@" + user.username }</p>
                                    </div>
                                </button>
                            ) }
                        </div>
                        <div className="mt-2 mb-4">
                            <Link href="/admin/login">
                                <button
                                    className="border border-cyan-700 hover:bg-cyan-700 hover:text-white text-cyan-700 font-bold text-sm px-4 py-2 rounded-full"
                                    onClick={ handleLogout }
                                >
                                    LOGOUT
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) }
            { isConfirmationModalOpen && (
                <ConfirmationModal
                    warning={ warningMessage }
                    message={ confirmMessage }
                    onConfirm={ handleConfirm }
                />
            ) }
            {/* Additional CSS for Print mode */ }
            <style jsx>
                { `
                    @media print {
                        .hide-print {
                            display: none;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AdminSidebar;
