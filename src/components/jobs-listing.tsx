import JobCard from "./job-card";
import JobCardSkeleton from "./job-card-skeleton";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { setSelectedJob } from "../redux/slices/job";

export default function JobsListing(props: { loading: boolean }) {
  const dispatch = useAppDispatch();
  const { searchedJobs } = useAppSelector((store) => store.job);
  const { loading } = props;
  const handleCardOnClick = (job: any) => {
    dispatch(setSelectedJob(job));
  };

  return (
    <div className="flex flex-col gap-3 h-[90vh] overflow-y-scroll hide-scrollbar">
      {!loading ? (
        searchedJobs?.map((job: any) => {
          return (
            <JobCard
              job={job}
              handleOnClick={handleCardOnClick}
              isMyJob={false}
              savedInit={job?.saved?.length > 0}
            />
          );
        })
      ) : (
        <>
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </>
      )}
    </div>
  );
}
