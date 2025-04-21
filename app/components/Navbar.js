"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [DropDownOpen, setDropDownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropDownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black sticky top-0 z-40 flex justify-between items-center px-4 text-white h-[4rem] ">
      <div className="logo font-bold text-xl flex items-center justify-center gap-2">
        {" "}
        <img className="" src="/appLogo.gif" width={40} height={40} alt="no" />
        <Link href={"/"}>
          {" "}
          <span> GetMeAChai!</span>
        </Link>
      </div>
      <ul className="navList flex gap-8 items-center">
        <Link href={"/"} className="font-medium hover:text-[1.04rem]">
          Home
        </Link>
        <Link href={"/about"} className="font-medium hover:text-[1.04rem]">
          About
        </Link>

        {session && (
          <li href={"/"} className="font-medium hover:text-[1.04rem]">
            <div className="relative">
              <button
                id="dropdownHoverButton"
                ref={buttonRef}
                onClick={() => {
                  setDropDownOpen(!DropDownOpen);
                  console.log(DropDownOpen);
                }}
                className="text-white  bg-black border  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                welcome {session.user.name}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdownHover"
                ref={dropdownRef}
                className={`z-10 absolute mt-4 ${
                  DropDownOpen ? "" : "hidden"
                }  bg-black rounded-lg shadow-sm w-44 `}
              >
                <ul
                  className="py-2 text-sm text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-900 "
                    >
                      {" "}
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-900 "
                    >
                      {" "}
                      Your Page
                    </Link>
                  </li>

                  <li>
                    <Link
                      onClick={() => signOut()}
                      href="#"
                      className="block px-4 py-2 bg-black hover:bg-gray-900"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        )}
        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-teal-300 to-lime-300 hover:bg-gradient-to-r hover:from-lime-300 hover:to-teal-300  focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            >
              Login
            </button>
          </Link>
        )}
      </ul>
    </nav>
  );
};
// 2:14
export default Navbar;
