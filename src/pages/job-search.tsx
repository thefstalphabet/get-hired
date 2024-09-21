import JobsFilter from "../components/jobs-filter";
import JobsListing from "../components/jobs-listing";
import JobDetail from "../components/job-detail";

export default function JobSearch() {
  return (
    <div>
      <div className="relative">
        <div className="h-24" style={{ backgroundColor: "#691F74" }}></div>
        <div className="absolute bottom-[34px] left-1/2 transform -translate-x-1/2">
          <JobsFilter type="big" />
        </div>
        <div className="h-32 bg-white"></div>
      </div>
      <div
        className="grid grid-flow-col grid-cols-2 p-5 gap-3 px-40"
        style={{ backgroundColor: "#F6F6F9" }}
      >
        <JobsListing />
        <JobDetail />
      </div>
    </div>
  );
}
