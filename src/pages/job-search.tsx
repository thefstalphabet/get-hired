import JobsFilter, { ISearchQuery } from "../components/jobs-filter";
import JobsListing from "../components/jobs-listing";
import JobDetail from "../components/job-detail";
import { useAppDispatch } from "../redux/Hooks";
import useFetch from "../hooks/use-fetch";
import { setSearchedJobs } from "../redux/slices/job";
import { useEffect } from "react";
import { getJobs } from "../api/jobs";

export default function JobSearch() {
  const dispatch = useAppDispatch();
  const {
    data: jobs,
    loading: jobsLoading,
    makeRequest,
  } = useFetch(getJobs, {});

  useEffect(() => {
    dispatch(setSearchedJobs(jobs));
  }, [jobs]);

  function handleSearchSubmit(searchQuery: ISearchQuery) {
    makeRequest(searchQuery);
  }

  return (
    <div>
      <div className="relative">
        <div className="h-24" style={{ backgroundColor: "#691F74" }}></div>
        <div className="absolute bottom-[34px] left-1/2 transform -translate-x-1/2">
          <JobsFilter
            type="big"
            handleSearchSubmit={handleSearchSubmit}
            loading={jobsLoading}
          />
        </div>
        <div className="h-32 bg-white"></div>
      </div>
      <div
        className="grid grid-flow-col grid-cols-2 p-5 gap-3 px-40"
        style={{ backgroundColor: "#F6F6F9" }}
      >
        <JobsListing loading={jobsLoading} />
        <JobDetail />
      </div>
    </div>
  );
}