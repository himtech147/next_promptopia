"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";

const Nav = () => {
  // from session get data, renaming to session
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect(() => {
  //   // getProviders It calls /api/auth/providers and
  //   // returns a list of the currently configured
  //   // authentication providers. It can be useful if
  //   // you are creating a dynamic custom sign in page.
  //   (async () => {
  //     const res = await getProviders();
  //     console.log(res);
  //     setProviders(res);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <div className="rounded-full w-32 h-32">
          <Image
            src="/assets/images/nav_logo.jpeg"
            width={100}
            height={100}
            priority={true}
            alt="logo"
            className="overflow-hidden rounded-full border-orange-500 border-x-4 border-spacing-y-4 border-spacing-x-4 p-[2px]"
          ></Image>
          <p className="orange_gradient_logo">PromptoGram</p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="orange_gradient_btn">
              Create Prompt
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="orange_gradient_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          // <>
          //   {providers &&
          //     Object.values(providers).map((provider) => (
          //       <button
          //         type="button"
          //         key={provider.id}
          //         onClick={() => {
          //           signIn(provider.Id);
          //         }}
          //         className="black_btn"
          //       >
          //         Sign In
          //         <Image
          //           src={provider.image}
          //           width={37}
          //           height={37}
          //           className="rounded-full"
          //         ></Image>
          //       </button>
          //     ))}
          // </>
          <>
            {providers && (
              <div className="group">
                <button
                  type="button"
                  onClick={() => {
                    signIn();
                  }}
                  className="black_gray_btn"
                >
                  <span class="animate-ping absolute inline-flex h-8 w-16 rounded-full bg-gray-100 opacity-75"></span>
                  Sign In
                  <Image
                    src="/assets/images/login.svg"
                    width={30}
                    height={30}
                    className="rounded-full mx-1 fill-cyan-200 text-red-400"
                  ></Image>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
              //setToggleDropdown(!toggleDropdown) not right approach
            ></Image>
            {toggleDropdown && (
              <div className="dropdown m-4">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => {
                    signIn(provider.Id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
