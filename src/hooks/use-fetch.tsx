import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (apiCallFun: any, payload?: any) => {
  const { session } = useSession();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const makeRequest = async (args?: any) => {
    setLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });
      let query;
      if (payload) {
        query = payload;
      }
      if (args) {
        query = { ...query, ...args };
      }
      const res = await apiCallFun(supabaseAccessToken, query);
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeRequest };
};

export default useFetch;
