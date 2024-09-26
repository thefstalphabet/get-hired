import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { Card } from "./ui/card";
import useFetch from "../hooks/use-fetch";
import { bookmarkJob } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";
import { useAppSelector } from "../redux/hooks";

export default function JobCard(props: {
  job: any;
  handleOnClick: Function;
  isMyJob: boolean;
  savedInit: boolean;
}) {
  const { job, savedInit, isMyJob, handleOnClick } = props;
  const { selectedJob } = useAppSelector((store) => store.job);
  const { user } = useUser();
  const [saved, setSaved] = useState<boolean>(savedInit);
  const { makeRequest, data } = useFetch(bookmarkJob);

  const handleBookmarkClicks = async () => {
    await makeRequest({
      user_id: user?.id,
      job_id: job?.id,
      alreadyBookmarked: saved,
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setSaved(data?.length > 0);
    }
  }, [data]);

  return (
    <Card
      className={`flex gap-6 p-5 cursor-pointer ${
        job?.id === selectedJob?.id && "border-black"
      }`}
      onClick={() => {
        handleOnClick(job);
      }}
    >
      <img
        className="h-[3rem] border p-2 rounded-md"
        src={job.company.logo_url}
        alt="company logo"
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{job.title}</h1>
          {!isMyJob &&
            (saved ? (
              <FaBookmark
                className="text-xl cursor-pointer"
                onClick={handleBookmarkClicks}
              />
            ) : (
              <FaRegBookmark
                className="text-xl cursor-pointer"
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
            {/* {Math.floor((Date.now() - new Date(selectedJob?.created_at)) / (1000 * 3600 * 24))} days ago */}
          </p>
        </div>
      </div>
    </Card>
  );
}
