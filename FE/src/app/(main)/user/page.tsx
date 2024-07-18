"use client";

import { useState } from "react";
import NavBarUser from "./navbar";
import FormProfile from "./profile";
import Contact from "./contact";
import ChangePasswordPage from "./changePw";
import { useSession } from "next-auth/react";
import RequireSignIn from "@/components/ui/require-signin";
import Spinner from "@/components/ui/spinner";

export default function Profile() {
  const [page, setPage] = useState<string>("profile");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="p-8 w-full min-h-screen">
        <div className="flex items-center w-full space-x-4">
          <div className="space-y-2 w-full">
            <Spinner size={100} />
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return <RequireSignIn />;
  }

  const handleNavClick = (page: string) => {
    setPage(page);
  };

  return (
    <div className="w-full flex">
      <NavBarUser onNavClick={handleNavClick} />
      <main className="w-3/4 p-8">
        <div className="w-full mx-auto p-6 mt-10 bg-white rounded-none shadow-lg">
          {page === "contacts" ? (
            <>
              <div className="text-start mb-6">
                <h1 className="text-3xl">Contact Management</h1>
                <h2 className="text-sm">
                  Add more contacts to easily place an order
                </h2>
              </div>
              <Contact />
            </>
          ) : page === "changePw" ? (
            <>
              <div className="text-start mb-6">
                <h1 className="text-3xl">Password Management</h1>
                <h2 className="text-sm">
                  Protect your account with a strong password
                </h2>
              </div>
              <ChangePasswordPage />
            </>
          ) : (
            <>
              <div className="text-start mb-6">
                <h1 className="text-3xl">Profile Management</h1>
                <h2 className="text-sm">
                  Add more information to protect your account
                </h2>
              </div>
              <FormProfile />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
