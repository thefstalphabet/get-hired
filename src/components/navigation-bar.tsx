import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function NavigationBar() {
  const [signInModalVisibility, setSignInModalVisibility] =
    useState<boolean>(false);
  const [search, setSearch] = useSearchParams();

  const handleOutSideModalClicks = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      setSignInModalVisibility(false);
    }
    setSearch({});
  };

  useEffect(() => {
    if (search.get("sign-in")) {
      setSignInModalVisibility(true);
    }
  }, [search]);

  return (
    <nav className="flex items-center justify-between px-20 py-5">
      <Link to="/">
        <img className="w-[8rem]" src={logo} alt="logo" />
      </Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Button
            onClick={() => {
              setSignInModalVisibility(true);
            }}
          >
            Sign In
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
        <div
          onClick={handleOutSideModalClicks}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <SignIn
            fallbackRedirectUrl="/job-search"
            signUpForceRedirectUrl="/job-search"
          />
        </div>
      )}
    </nav>
  );
}
