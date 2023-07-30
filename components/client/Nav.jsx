"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from "@utils/AuthContext";

const Nav = () => {
  const { logout, userId } = useAuthContext();
  const [showLinks, setShowLinks] = useState(false); // Add showLinks state
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [clickedLink, setClickedLink] = useState("home");

  const handleLogout = () => {
    // Clear any existing timer if present
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    // Set a new timer for logout (e.g., 5 seconds)
    const timer = setTimeout(() => {
      logout(); // Call the logout method after the timer expires
    }, 5000); // 5000 milliseconds = 5 seconds

    // Save the timer ID in the state
    setLogoutTimer(timer);
  };

  const handleToggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleHideLinks = () => {
    setShowLinks(false);
  };

  const handleLinkClick = (link) => {
    setClickedLink(link);
  };

  return (
    <nav>
      <header className="flex justify-between items-center glassmorphism">
        <div className="flex items-center">
          <Image
            src="/bbia-logo.svg"
            alt="BBIA logo"
            width={ 40 }
            height={ 40 }
            className="object-contain"
          />
          <h1 className="text-sm font-bold ml-2">
            BBIA BOOK LIBRARY SYSTEM
          </h1>
        </div>
        <div className="md:hidden"> {/* Show this div on small screens only */ }
          <button
            className={ `mr-4 text-cyan-600 font-bold text-sm ${clickedLink === "dashboard" ? "opacity-100" : "opacity-70"
              }` }
            onClick={ handleToggleLinks } // Toggle the links when the button is clicked
          >
            <div className="flex flex-row items-center space-x-2">
              <Image
                src="/menu.svg"
                alt="Menu Button"
                width={ 32 }
                height={ 32 }
                className="object-contain"
              />
            </div>
          </button>
        </div>
        <div className={ `hidden md:flex ${showLinks ? "flex" : "hidden"}` }> {/* Show this div on medium screens and above, or when showLinks is true */ }
          <Link href="/client/client-pages">
            <button
              className={ `mr-4 text-cyan-600 font-bold text-sm ${clickedLink === "home" ? "opacity-100" : "opacity-70"
                }` }
              onClick={ () => handleLinkClick("home") }
            >
              <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                Home
              </p>
            </button>
          </Link>
          <Link href="/client/client-pages/books">
            <button
              className={ `mr-4 text-cyan-600 font-bold text-sm ${clickedLink === "catalogue" ? "opacity-100" : "opacity-70"
                }` }
              onClick={ () => handleLinkClick("catalogue") }
            >
              <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                Catalogue
              </p>
            </button>
          </Link>
          <Link href="/client/client-pages/orders">
            <button
              className={ `mr-4 text-cyan-600 font-bold text-sm ${clickedLink === "orders" ? "opacity-100" : "opacity-70"
                }` }
              onClick={ () => handleLinkClick("orders") }
            >
              <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                Orders
              </p>
            </button>
          </Link>
          <Link href="/client/client-pages/loans">
            <button
              className={ `mr-4 text-cyan-600 font-bold text-sm ${clickedLink === "loans" ? "opacity-100" : "opacity-70"
                }` }
              onClick={ () => handleLinkClick("loans") }
            >
              <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                Borrows
              </p>
            </button>
          </Link>
          <Link href={ `/client/client-pages/profile/${id}` }>
            <button
              className={ `mr-6 text-cyan-600 font-bold text-sm ${clickedLink === "profile" ? "opacity-100" : "opacity-70"
                }` }
              onClick={ () => handleLinkClick("profile") }
            >
              <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                Profile
              </p>
            </button>
          </Link>
          <Link href="/client/login">
            <button
              className="border border-cyan-700 hover:bg-cyan-700 hover:text-white text-cyan-700 font-bold text-sm px-4 py-2 rounded-full"
              onClick={ handleLogout }
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </header>
      { showLinks && (
        <div
          className="fixed top-16 right-8 z-50 md:hidden glassmorphism"
          onClick={ handleHideLinks } // Hide the links when the overlay is clicked
        >
          <div className="flex flex-col w-1/2">
            <Link href="/client/client-pages">
              <button
                className="mr-4 mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                onClick={ () => handleLinkClick("home") }
              >
                <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                  Home
                </p>
              </button>
            </Link>
            <Link href="/client/client-pages/books">
              <button
                className="mr-4 mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                onClick={ () => handleLinkClick("catalogue") }
              >
                <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                  Catalogue
                </p>
              </button>
            </Link>
            <Link href="/client/client-pages/orders">
              <button
                className="mr-4 mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                onClick={ () => handleLinkClick("orders") }
              >
                <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                  Orders
                </p>
              </button>
            </Link>
            <Link href="/client/client-pages/loans">
              <button
                className="mr-4 mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                onClick={ () => handleLinkClick("loans") }
              >
                <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                  Borrows
                </p>
              </button>
            </Link>
            <Link href={ `/client/client-pages/profile/${userId}` }>
              <button
                className="mr-4 mb-2 text-cyan-600 font-bold hover:text-orange-300 text-sm"
                onClick={ () => handleLinkClick("profile") }
              >
                <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
                  Profile
                </p>
              </button>
            </Link>
            <Link href="/client/login">
              <button
                className="border border-cyan-700 hover:bg-cyan-700 hover:text-white text-cyan-700 font-bold text-sm px-4 py-2 rounded-full"
                onClick={ handleLogout }
              >
                LOGOUT
              </button>
            </Link>
          </div>
        </div>
      ) }
    </nav>
  );
};

export default Nav;
