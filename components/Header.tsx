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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="bg-linear-to-r from-indigo-900 to-purple-900 shadow-xl">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedOut>
            <div className="flex gap-3">
              <SignInButton>
                <button className="cursor-pointer px-5 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="cursor-pointer px-5 py-2 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-all shadow-md hover:shadow-lg border border-indigo-500">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex justify-center items-center gap-3">
              <span className="text-sm font-medium text-white">
                {user?.firstName}
              </span>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-linear-to-br from-indigo-800 to-purple-800 p-6 sm:max-w-sm shadow-2xl">
          {/* Logo and close button */}
          <div className="flex items-center justify-between">
            <LogoName />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 cursor-pointer rounded-lg p-2.5 text-white hover:bg-white/10 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
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
                      <button className="cursor-pointer w-full px-5 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all shadow-md">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="cursor-pointer w-full px-5 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-900 transition-all shadow-md border border-indigo-600">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <div className="flex justify-start items-center gap-3">
                  <UserButton />
                  <span className="text-base font-medium text-white">
                    {user?.firstName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
