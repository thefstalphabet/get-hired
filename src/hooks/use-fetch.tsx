import { useSession, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const useFetch = (apiCallFun: any, payload: any) => {
  const { session } = useSession();
  const { isLoaded } = useUser();
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const makeRequest = async (args?: any) => {
    setLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });
      const res = await apiCallFun(supabaseAccessToken, {payload, ...args});
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    makeRequest();
  }, [isLoaded]);

  return { data, loading, error, makeRequest };
};

export default useFetch;
