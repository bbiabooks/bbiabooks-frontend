"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@utils/AuthContext";

const Nav = () => {
  const { logout, userId } = useAuthContext();
  const router = useRouter();

  const handleUserProfile = (id) => {
    router.push(`/client/client-pages/profile/${id}`);
  };

  // Links
  const handleViewHome = () => {
    router.push(`/client/client-pages`);
  };

  const handleViewCatalogue = () => {
    router.push(`/client/client-pages/books`);
  };

  const handleViewOrders = () => {
    router.push(`/client/client-pages/orders`);
  };

  const handleViewLoans = () => {
    router.push(`/client/client-pages/loans`);
  };

  const handleViewTransactions = () => {
    router.push(`/client/client-pages/transactions`);
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
        <div>
          <button
            className="mr-4 text-cyan-600 font-bold hover:text-orange-300 text-sm"
            onClick={ handleViewHome }
          >
            <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
              Home
            </p>
          </button>
          <button
            className="mr-4 text-cyan-600 font-bold hover:text-orange-300 text-sm"
            onClick={ handleViewCatalogue }
          >
            <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
              Catalogue
            </p>
          </button>
          <button
            className="mr-4 text-cyan-600 font-bold hover:text-orange-300 text-sm"
            onClick={ handleViewOrders }
          >
            <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
              Orders
            </p>
          </button>
          <button
            className="mr-4 text-cyan-600 font-bold hover:text-orange-300 text-sm"
            onClick={ handleViewLoans }
          >
            <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
              Borrows
            </p>
          </button>
          <button
            className="mr-6 text-cyan-600 font-bold hover:text-orange-300 text-sm"
            onClick={ () => handleUserProfile(userId) }
          >
            <p className="flex flex-row items-center text-cyan-600 opacity-70 hover:opacity-100">
              Profile
            </p>
          </button>
          <Link href="/client/login">
            <button
              className="border border-cyan-700 hover:bg-cyan-700 hover:text-white text-cyan-700 font-bold text-sm px-4 py-2 rounded-full"
            >
              LOGOUT
            </button>
          </Link>
        </div>
      </header>
    </nav>
  );
};

export default Nav;
