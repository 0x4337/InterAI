"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isLoggedIn = true;

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();

      setProvidersFunc(response);
    };

    setProviders();
  }, []);

  return (
    <nav className="flex fixed top-0 glass justify-between items-center w-full p-2 sm:p-3 mb-5">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="/assets/objects/abstract-shape-81.png"
          width={60}
          height={60}
          alt="InterAI Logo"
        />

        <p className="hidden sm:block border-l px-2 hover:bg-white hover:text-black ease-out duration-300">
          InterAI
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isLoggedIn ? (
          <div className="flex gap-3 items-center">
            <Link href="/interview" className="glass_btn border">
              New Interview
            </Link>
            <button onClick={signOut} className="glass_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/objects/abstract-shape-77.png"
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="glass_btn"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/objects/abstract-shape-77.png"
              width={37}
              height={37}
              alt="profile"
              className="rounded-full cursor-pointer"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
                console.log(toggleDropdown);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="glass_btn"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/interview"
                  className="glass_btn "
                  onClick={() => setToggleDropdown(false)}
                >
                  New Interview
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full border border-transparent bg-white text-primary px-2 py-0.5 hover:border-white hover:bg-primary hover:text-white ease-out duration-300"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="glass_btn"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
