import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Button } from "antd";
import { AiFillEdit } from "react-icons/ai";
import PostJobDrawer from "./post-job-drawer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoginModal } from "../redux/slices/global";

export default function NavigationBar() {
  const { loginModal } = useAppSelector((store) => store.global);
  const dispatch = useAppDispatch();
  const [postJobDrawerVisibility, setPostJobDrawerVisibility] =
    useState<boolean>(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  const handleOutSideModalClicks = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(setLoginModal(false));
    }
    setSearch({});
  };

  useEffect(() => {
    if (search.get("sign-in")) {
      dispatch(setLoginModal(true));
    }
  }, [search]);

  return (
    <>
      <nav className="flex items-center justify-between px-20 py-1">
        <Link to="/">
          <img className="w-[3rem]" src={logo} alt="logo" />
        </Link>
        <div>
          <SignedOut>
            <Button
            className="shadow-none"
              size="large"
              shape="round"
              type="primary"
              onClick={() => {
                dispatch(setLoginModal(true));
              }}
            >
              Sign in
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
        {loginModal && (
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
