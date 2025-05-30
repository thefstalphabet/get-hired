import JobSearchAndFilter from "../components/job-search-and-filter";
import JobsListing from "../components/jobs-listing";
import JobDetail from "../components/job-detail";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useFetch from "../hooks/use-fetch";
import { useEffect } from "react";
import { getJobs, getSavedJobs, IGetJobPayload } from "../api/jobs";
import NoJobsFound from "../assets/noJobsFound.png";
import { useUser } from "@clerk/clerk-react";
import { setJobs } from "../redux/slices/job/jobs";

export default function JobSearch() {
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((store) => store.jobs);
  const { user } = useUser();
  const {
    data: allJobs,
    loading: jobsLoading,
    makeRequest: fetchJobs,
  } = useFetch(getJobs, { user_id: user?.id }, true);
  const {
    data: allsavedJobs,
    makeRequest: fetchSavedJobs,
    loading: savedJobsLoading,
  } = useFetch(getSavedJobs, { id: user?.id });

  function handleSearchSubmit(searchQuery: IGetJobPayload) {
    fetchJobs({ ...searchQuery, user_id: user?.id });
  }

  useEffect(() => {
    dispatch(setJobs(allJobs));
  }, [allJobs]);

  useEffect(() => {
    dispatch(setJobs(allsavedJobs));
  }, [allsavedJobs]);

  return (
    <div>
      <div className="relative">
        <div className="h-24" style={{ backgroundColor: "#691F74" }}></div>
        <div className="absolute bottom-[29px] left-1/2 transform -translate-x-1/2">
          <JobSearchAndFilter
            type="large"
            handleSearchSubmit={handleSearchSubmit}
            loading={jobsLoading}
            fetchJobs={fetchJobs}
            fetchSavedJobs={fetchSavedJobs}
          />
        </div>
        <div className="h-32 bg-white"></div>
      </div>

      {jobs.length ? (
        <div
          className="grid grid-flow-col grid-cols-2 p-4 gap-2 px-44"
          style={{ backgroundColor: "#F6F6F9" }}
        >
          <JobsListing loading={jobsLoading || savedJobsLoading} />
          <JobDetail />
        </div>
      ) : (
        <div
          className="p-10 flex flex-col items-center"
          style={{ backgroundColor: "#F6F6F9" }}
        >
          <img src={NoJobsFound} alt="No job Found" className="w-[18rem]" />
          <p>No result found for your searched data.</p>
        </div>
      )}
    </div>
  );
}
