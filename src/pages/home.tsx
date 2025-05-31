import { useNavigate } from "react-router-dom";
import HomeImage from "../assets/home-img.png";
import Register from "../assets/register.svg";
import JobSearchAndFilter from "../components/job-search-and-filter";
import { IGetJobPayload } from "../api/jobs";
import useScreenWidth from "../hooks/use-screen-width";
import { Button } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { setLoginModal } from "../redux/slices/global";
import Footer from "../components/footer";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const signupURL = "https://probable-parakeet-93.accounts.dev/sign-up";

export default function Home() {
  const navigate = useNavigate();
  const screenWidth = useScreenWidth();
  const dispatch = useAppDispatch();
  const { isSignedIn } = useUser();

  function handleSearchSubmit(searchQuery: IGetJobPayload) {
    navigate(
      `/job-search?query=${JSON.stringify({
        jobTitle: searchQuery?.title,
        jobLocation: searchQuery?.location,
      })}`
    );
  }

  useEffect(() => {
    if (isSignedIn) {
      navigate("/job-search");
    }
  }, []);

  return (
    <div>
      <div className="relative">
        <div
          className="pt-16 flex flex-col gap-3 text-center justify-center items-center bg-no-repeat bg-left-top md:gap-8"
          style={{
            backgroundColor: "#691F74",
            backgroundImage:
              "url(https://cdn-static.talent.com/img/home-page/img-bg-3.png)",
            backgroundSize: "1000px",
          }}
        >
          <h1 className="font-bold text-white text-3xl md:text-5xl">
            Your <span style={{ color: "#E6CCE9" }}>job search</span> starts
            here.
          </h1>
          <div className="font-normal text-white leading-10 text-lg md:text-2xl">
            <p>
              Search from
              <span className="font-medium">over 40 million jobs</span>, save
              the ones you love,
            </p>
            <p>and apply in seconds.</p>
          </div>
          {screenWidth >= 700 && (
            <img className="w-[85%] mt-10" src={HomeImage} alt="img-home" />
          )}
        </div>
        <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
          <JobSearchAndFilter
            handleSearchSubmit={handleSearchSubmit}
            type="small"
          />
        </div>
      </div>
      <div className="flex gap-32 items-center justify-center bg-[#fff6f3] pt-32 pb-10">
        <img className="w-[25%] scale-x-[-1]" src={Register} alt="img-home" />
        <div className="grid gap-10">
          <h2 className="w-[30rem] font-bold text-xl text-[#44195d] md:text-5xl">
            Create an account and{" "}
            <span className="text-[#fe3b1f]">find the right job</span> for you.
          </h2>
          <div className="flex gap-2">
            <Button
              className="py-5 px-5 shadow-none border-[#fe3b1f] text-[#fe3b1f]"
              shape="round"
              variant="outlined"
              htmlType="submit"
              onClick={() => {
                window.location.href = signupURL;
              }}
            >
              Create my account
            </Button>
            <Button
              className="py-5 px-5 shadow-none text-black"
              type="link"
              htmlType="submit"
              onClick={() => {
                dispatch(setLoginModal(true));
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
