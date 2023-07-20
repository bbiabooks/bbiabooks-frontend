"use client";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
    return (
        <nav>
            <header className="flex justify-between items-center py-2 px-4">
                <div className="flex items-center">
                    <Image
                        src="/bbia-logo.svg"
                        alt="BBIA logo"
                        width={ 60 }
                        height={ 60 }
                        className="object-contain"
                    />
                    <h1 className="text-lg font-medium">
                        Building Blocks International Academy Philippines
                    </h1>
                </div>
                <div>
                    <Link href="/client/registration/signup">
                        <button className="hover:bg-orange-300 hover:text-white text-cyan-700 font-bold text-base px-4 py-2 rounded-full">
                            SIGNUP
                        </button>
                    </Link>
                    <Link href="/client/login">
                        <button className="bg-cyan-700 hover:bg-orange-300 text-white font-bold text-base px-4 py-2 rounded-full ml-4">
                            LOGIN
                        </button>
                    </Link>
                </div>
            </header>
        </nav>
    );
};

export default Nav;
