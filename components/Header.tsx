"use client";

import { useState } from "react";

import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import LogoName from "./LogoName";
import Navigation from "./Navigation";
import DarkModeButton from "./DarkModeButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="bg-linear-to-r from-indigo-900 to-purple-900 dark:from-slate-900 dark:to-slate-800 backdrop-blur-xl border-b border-white/30 shadow-2xl transition-all duration-300 relative before:absolute before:inset-0 before:bg-linear-to-r before:from-white/5 before:to-transparent before:pointer-events-none h-16 md:h-19">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6 relative z-10 min-h-0"
      >
        {/* Logo section */}
        <div className="flex lg:flex-1">
          <LogoName />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-white/10 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        {/* App navigation links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Navigation />
        </PopoverGroup>

        {/* User account section and sign in/up buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <SignedOut>
            <div className="flex gap-3">
              <SignInButton>
                <button className="cursor-pointer px-6 py-2.5 bg-white/90 backdrop-blur-sm text-indigo-700 font-semibold rounded-full border border-indigo-200/50 shadow-lg hover:shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 dark:text-indigo-200 dark:border-indigo-500/50 dark:hover:bg-slate-700 dark:hover:text-indigo-100">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="cursor-pointer px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-center items-center gap-3">
              <span className="text-sm font-medium text-white">
                {user?.username
                  ? user.username
                  : user?.firstName + " " + user?.lastName}
              </span>
              <UserButton />
            </div>
          </SignedIn>

          <DarkModeButton />
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm overflow-y-auto bg-linear-to-br from-indigo-800 to-purple-800 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] p-6 shadow-2xl transition-colors duration-300">
          {/* Logo and close button */}
          <div className="flex items-center justify-between">
            <LogoName />
            <div className="flex items-center gap-3">
              <DarkModeButton />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 cursor-pointer rounded-lg p-2.5 text-white hover:bg-white/10 transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 flex flex-col justify-evenly divide-y divide-white/10">
              {/* App navigation links */}
              <div className="space-y-2 py-6">
                <Navigation onNavigate={() => setMobileMenuOpen(false)} />
              </div>

              {/* User account section */}
              <div className="py-6">
                <SignedOut>
                  <div className="flex flex-col gap-3">
                    <SignInButton>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="cursor-pointer w-full px-5 py-3 bg-white/90 backdrop-blur-sm text-indigo-700 font-semibold rounded-full border border-indigo-200/50 shadow-lg hover:shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 dark:text-indigo-200 dark:border-indigo-500/50 dark:hover:bg-slate-700 dark:hover:text-indigo-100"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="cursor-pointer w-full px-5 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600"
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-start items-center gap-3">
                    <UserButton />
                    <span className="text-base font-medium text-white">
                      {user?.firstName}
                    </span>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
