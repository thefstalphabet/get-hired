import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "antd";
import { AiFillEdit } from "react-icons/ai";
import PostJobDrawer from "./post-job-drawer";

export default function NavigationBar() {
  const [signInModalVisibility, setSignInModalVisibility] =
    useState<boolean>(false);
  const [postJobDrawerVisibility, setPostJobDrawerVisibility] =
    useState<boolean>(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

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
    <>
      <nav className="flex items-center justify-between px-20 py-5">
        <Link to="/">
          <img className="w-[8rem]" src={logo} alt="logo" />
        </Link>
        <div>
          <SignedOut>
            <Button
              type="primary"
              onClick={() => {
                setSignInModalVisibility(true);
              }}
            >
              Sign In
            </Button>
          </SignedOut>
          <div
            className={
              user?.unsafeMetadata?.role === "2" ? "flex items-start gap-4" : ""
            }
          >
            {user?.unsafeMetadata?.role === "2" && (
              <Button
                shape="circle"
                size="large"
                type="primary"
                variant="outlined"
                className="shadow-none"
                icon={<AiFillEdit className="text-lg" />}
                onClick={() => {
                  setPostJobDrawerVisibility(true);
                }}
              />
            )}
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
              {/* <UserButton.MenuItems>
                  <UserButton.Link
                    label="Bookmarks"
                    labelIcon={<></>}
                    href="/bookmarks"
                  />
                </UserButton.MenuItems> */}
              {/* </UserButton> */}
            </SignedIn>
          </div>
        </div>
        {signInModalVisibility && (
          <div
            onClick={handleOutSideModalClicks}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <SignIn
            // fallbackRedirectUrl="/onbording"
            // signUpForceRedirectUrl="/onbording"
            />
          </div>
        )}
      </nav>
      <PostJobDrawer
        visibility={postJobDrawerVisibility}
        setVisibility={setPostJobDrawerVisibility}
      />
    </>
  );
}
