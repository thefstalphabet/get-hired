import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (callBackFunction: any, options: any) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { session } = useSession();

  const makeRequest = async (...args: any) => {
    setLoading(true);

    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });
      const res = await callBackFunction(supabaseAccessToken, options, ...args);
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { makeRequest, data, loading, error };
};

export default useFetch;
