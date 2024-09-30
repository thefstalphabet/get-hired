import { useNavigate } from "react-router-dom";
import HomeImage from "../assets/home-img.png";
import JobsFilter, { ISearchQuery } from "../components/jobs-filter";
export default function Home() {
  const navigate = useNavigate();

  function handleSearchSubmit(searchQuery: ISearchQuery) {
    navigate(
      `/job-search?query=${JSON.stringify({
        jobTitle: searchQuery?.title,
        jobLocation: searchQuery?.location,
      })}`
    );
  }
  return (
    <div className="relative">
      <div
        className="pt-16 flex flex-col gap-8 text-center justify-center items-center bg-no-repeat bg-left-top"
        style={{
          backgroundColor: "#691F74",
          backgroundImage:
            "url(https://cdn-static.talent.com/img/home-page/img-bg-3.png)",
          backgroundSize: "1000px",
        }}
      >
        <h1 className="text-5xl font-bold text-white">
          Your <span style={{ color: "#E6CCE9" }}>job search</span> starts here.
        </h1>
        <div className="text-2xl font-normal text-white leading-10">
          <p>
            Search from{" "}
            <span className="font-medium">over 40 million jobs</span>, save the
            ones you love,
          </p>
          <p>and apply in seconds.</p>
        </div>
        <img className="w-[85%] mt-10" src={HomeImage} alt="img-home" />
      </div>
      <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2">
        <JobsFilter handleSearchSubmit={handleSearchSubmit} type="small" />
      </div>
    </div>
  );
}
