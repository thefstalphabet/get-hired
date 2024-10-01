import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
// import { Card } from "./ui/card";
import useFetch from "../hooks/use-fetch";
import { bookmarkJob } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedJob } from "../redux/slices/job";
import ReCard from "../reusable-antd-components/ReCard";
import moment from "moment";

export default function JobCard(props: { job: any }) {
  const { job } = props;
  const dispatch = useAppDispatch();
  const { selectedJob } = useAppSelector((store) => store.job);
  const { user } = useUser();
  const [saved, setSaved] = useState<boolean>(job?.saved?.length > 0);
  const { makeRequest, data } = useFetch(bookmarkJob);

  const handleBookmarkClicks = async () => {
    await makeRequest({
      user_id: user?.id,
      job_id: job?.id,
      alreadyBookmarked: saved,
    });
  };

  const handleOnCardClicks = () => {
    dispatch(setSelectedJob(job));
  };

  useEffect(() => {
    if (data !== undefined) {
      setSaved(data?.length > 0);
    }
  }, [data]);

  return (
    <ReCard
      className={`cursor-pointer  ${
        job?.id === selectedJob?.id && "border-black"
      }`}
      onClick={handleOnCardClicks}
    >
      <img
        className="h-[3rem] border p-2 rounded-md mb-2"
        src={job.company.logo_url}
        alt="company logo"
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{job.title}</h1>
          {!(job?.recruiter_id === user?.id) &&
            (saved ? (
              <FaBookmark
                className="text-2xl cursor-pointer"
                onClick={handleBookmarkClicks}
              />
            ) : (
              <FaRegBookmark
                className="text-2xl cursor-pointer"
                onClick={handleBookmarkClicks}
              />
            ))}
        </div>
        <h4 style={{ color: "#691F74" }} className="font-semibold">
          {job.company.name}
        </h4>
        <p>{job?.location}</p>
        <div style={{ color: "#676767" }}>
          <p className="text-sm mt-2 pr-10">
            {job?.description.split(".").slice(0, 2).join(".") +
              (job?.description.split(".").length > 2 ? "." : "")}
          </p>
          <p className="text-sm mt-1">
            {job?.created_at &&
              `${moment().diff(
                moment(selectedJob.created_at),
                "days"
              )} days ago`}
          </p>
        </div>
      </div>
    </ReCard>
  );
}
