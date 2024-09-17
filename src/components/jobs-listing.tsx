import { useEffect } from "react";
import { useSession } from "@clerk/clerk-react";
import { getJobs } from "../api/jobs";

export default function JobsListing() {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session?.getToken({
      template: "supabase",
    });
    console.log(supabaseAccessToken);
    if (supabaseAccessToken) {
      const data = await getJobs(supabaseAccessToken);
      console.log(data);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [session]);

  return <div>jobs-listing</div>;
}
