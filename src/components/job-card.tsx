import { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { Card } from "./ui/card";
import useFetch from "../hooks/use-fetch";
import { bookmarkJob } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";

export default function JobCard(props: {
  job: any;
  handleOnBookmark: Function;
  isMyJob: boolean;
  savedInit: boolean;
}) {
  const { job, handleOnBookmark, savedInit, isMyJob } = props;
  const { user } = useUser();
  const [saved, setSaved] = useState<boolean>(savedInit);
  const { makeRequest, data, loading } = useFetch(bookmarkJob, {
    alreadyBookmarked: saved,
  });

  const handleBookmarkClicks = async () => {
    const res = await makeRequest({ user_id: user?.id, job_id: job?.id });
    console.log(res);
  };

  useEffect(() => {
    if (data !== undefined) {
      setSaved(data?.length > 0);
    }
  }, [data]);

  return (
    <Card className="flex gap-6 p-5">
      <img
        className="h-[3rem] border rounded-md"
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
            {job?.description.split(".").slice(0, 3).join(".") +
              (job?.description.split(".").length > 3 ? "." : "")}
          </p>
          <p className="text-sm mt-1">
            {Math.floor(
              (Date.now() - new Date(job?.created_at)) / (1000 * 60 * 60 * 24)
            )}{" "}
            days ago
          </p>
        </div>
      </div>
    </Card>
  );
}
