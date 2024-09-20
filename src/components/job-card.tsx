import React, { useEffect, useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { Button } from "./ui/button";
import { FaBookmark } from "react-icons/fa6";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { FaLocationCrosshairs } from "react-icons/fa6";
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="grid gap-2">
            <h1 className="text-xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-1 text-sm">
              <FaLocationCrosshairs className="text-lg" />
              <p>{job?.location}</p>
            </div>
          </div>
          <img
            className="h-[3rem]"
            src={job.company.logo_url}
            alt="company logo"
          />
        </div>
      </CardHeader>
      <CardFooter>
        <p>{job?.description.slice(0, job.description.indexOf(".") + 1)}</p>
      </CardFooter>
      <CardFooter className="flex justify-between items-center gap-5">
        <Button className="flex-1" variant="outline">
          More Details
        </Button>
        {!isMyJob && (
          <Button
            variant="outline"
            onClick={handleBookmarkClicks}
            disabled={loading}
          >
            {saved ? <FaBookmark className="text-xl" /> : <FaRegBookmark className="text-xl"/>}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
