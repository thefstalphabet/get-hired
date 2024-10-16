import useFetch from "../hooks/use-fetch";
import { bookmarkJob } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedJob, updateSearchedJob } from "../redux/slices/job";
import ReCard from "../reusable-antd-components/ReCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getPostedDate } from "../Helper/methods";

export default function JobCard(props: { job: any; alreadySaved: boolean }) {
  const { job, alreadySaved } = props;
  const dispatch = useAppDispatch();
  const { selectedJob } = useAppSelector((store) => store.job);
  const { user } = useUser();
  const { makeRequest } = useFetch(bookmarkJob);

  const handleBookmarkClicks = async () => {
    await makeRequest({
      user_id: user?.id,
      job_id: job?.id,
      alreadyBookmarked: alreadySaved,
    });
    dispatch(updateSearchedJob({ job_id: job.id, updates: {}, alreadySaved }));
  };

  const handleOnCardClicks = () => {
    dispatch(setSelectedJob(job));
  };

  return (
    <ReCard
      className={`cursor-pointer  ${
        job?.id === selectedJob?.id && "border-[#691F74]"
      }`}
      onClick={handleOnCardClicks}
    >
      <img
        className="h-[3rem] border p-2 rounded-md mb-2"
        src={job?.company?.logo_url}
        alt="company logo"
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{job?.title}</h1>
          {!(job?.recruiter_id === user?.id) &&
            (alreadySaved ? (
              <FaHeart
                fill="red"
                className="text-2xl cursor-pointe "
                onClick={handleBookmarkClicks}
              />
            ) : (
              <FaRegHeart
                className="text-2xl cursor-pointer"
                onClick={handleBookmarkClicks}
              />
            ))}
        </div>
        <h4>
          {`${job?.company?.name} • ${job?.location} • ${getPostedDate(
            job?.created_at
          )}`}
        </h4>
        <div style={{ color: "#676767" }}>
          <p className="text-sm mt-2 pr-10">
            {job?.description?.split(".").slice(0, 2).join(".") +
              (job?.description?.split(".").length > 2 ? "." : "")}
          </p>
        </div>
      </div>
    </ReCard>
  );
}
