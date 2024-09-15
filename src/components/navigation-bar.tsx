import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

export default function NavigationBar() {
  const [signInModalVisibility, setSignInModalVisibility] =
    useState<boolean>(false);
  return (
    <nav className="flex items-center justify-between px-20 py-5">
      <Link to="/">
        <h1 className="text-2xl font-extrabold">Get Hired</h1>
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Button
            onClick={() => {
              setSignInModalVisibility(true);
            }}
          >
            Signin
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Applications Status"
                labelIcon={<></>}
                href="/applications-status"
              />
              <UserButton.Link
                label="Bookmarks"
                labelIcon={<></>}
                href="/bookmarks"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
      {signInModalVisibility && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <SignIn
            fallbackRedirectUrl="/dashboard"
            signUpForceRedirectUrl="/dashboard"
          />
        </div>
      )}
    </nav>
  );
}
