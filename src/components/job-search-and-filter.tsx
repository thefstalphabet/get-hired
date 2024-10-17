import { useEffect, useState } from "react";
import { State } from "country-state-city";
import { getCompanies } from "../api/company";
import useFetch from "../hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button, Divider, Form } from "antd";
import ReForm from "../reusable-antd-components/ReForm";
import ReSelect, {
  ISelectOptions,
} from "../reusable-antd-components/ReFormFields/ReSelect";
import { FaHeart, FaHourglassStart, FaRegCalendarAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";
import { useAppDispatch } from "../redux/hooks";
import { setSearchedJobs, setSearchedQuery } from "../redux/slices/job";
import { FaBuildingUser } from "react-icons/fa6";
import { CgOrganisation } from "react-icons/cg";
import { getSavedJobs, IGetJobPayload } from "../api/jobs";

type FIlterType = "small" | "large";

const dateFilterItems: ISelectOptions[] = [
  {
    label: "Last 24 Hours",
    value: `${new Date(new Date().getTime() - 24 * 60 * 60 * 1000)}`,
  },
  {
    label: "Last 3 Days",
    value: `${new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000)}`,
  },
  {
    label: "Last 7 Days",
    value: `${new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)}`,
  },
  {
    label: "Last 14 Days",
    value: `${new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000)}`,
  },
  {
    label: "Anytime",
    value: "",
  },
];
const statusFilterItems: ISelectOptions[] = [
  {
    label: "Still Hiring",
    value: "yes",
  },
  {
    label: "Closed",
    value: "no",
  },
];

export default function JobSearchAndFilter(props: {
  type: FIlterType;
  handleSearchSubmit: (searchQuery: IGetJobPayload) => void;
  loading?: boolean;
  fetchJobs: Function
}) {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const dispatch = useAppDispatch();
  const { user } = useUser();

  const { type, handleSearchSubmit, loading, fetchJobs } = props;
  const { data: companies } = useFetch(getCompanies, {}, true);
  const { data: allsavedJobs, makeRequest: fetchSavedJobs } = useFetch(
    getSavedJobs,
    { id: user?.id },
    true
  );
  const [myJobsOption, setMyJobsOption] = useState<boolean>(false);
  const [savedJobsOption, setSavedJobsOption] = useState<boolean>(false);

  const handleFormSubmit = (values: any) => {
    if (!isSignedIn) {
      return navigate("/?sign-in=true");
    }
    handleSearchSubmit(values);
  };

  const handleMyJobsOptionClicks = () => {
    setMyJobsOption(!myJobsOption);
    if (!myJobsOption) {
      handleSearchSubmit({ recruiter_id: user?.id });
    }
  };
  const handleSavedJobsOptionClicks = () => {
    setSavedJobsOption(!savedJobsOption);
    if (!savedJobsOption) {
      fetchSavedJobs();
    } else {
      fetchJobs();
    }
  };

  useEffect(() => {
    if (query) {
      const searchQuery = JSON.parse(query);
      form.setFieldsValue({
        title: searchQuery?.jobTitle,
        location: searchQuery?.jobLocation,
      });
    }
  }, [query]);

  useEffect(() => {
    dispatch(setSearchedJobs(allsavedJobs));
  }, [allsavedJobs]);

  return (
    <ReForm
      formInstance={form}
      onSubmit={handleFormSubmit}
      onChange={(changedValues: unknown, allValues: unknown) => {
        dispatch(setSearchedQuery(allValues));
      }}
      fieldsClassName="grid gap-7"
      layout="horizontal"
    >
      <div className="flex gap-4 border px-10 pr-2 py-2 items-center justify-center bg-white rounded-full">
        <div className="flex items-center gap-3">
          <label className="text-base whitespace-nowrap font-bold">What?</label>
          <ReInput
            variant="borderless"
            noStyle
            label=""
            name="title"
            type="string"
            placeholder="Job Title"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-base whitespace-nowrap font-bold">
            Where?
          </label>
          <ReSelect
            placeholder="Job Location"
            variant="borderless"
            className="w-60"
            noStyle
            label=""
            name="location"
            searchable
            items={State.getStatesOfCountry("IN").map(
              (city: { name: string }) => {
                const { name } = city;
                return {
                  label: name,
                  value: name,
                };
              }
            )}
          />
        </div>
        <Button
          className="rounded-full w-28 py-5 px-10 shadow-none"
          loading={loading}
          type="primary"
          icon={<IoSearch />}
          onClick={() => {
            form.submit();
          }}
        >
          Find Job
        </Button>
      </div>
      {type === "large" && (
        <div className="flex items-center justify-center gap-5">
          <div className="border rounded-full flex items-center px-2 pl-4 py-1">
            <FaHourglassStart />
            <ReSelect
              dropdownStyle={{ width: "10rem" }}
              variant="borderless"
              label=""
              placeholder="Status"
              noStyle
              name="is_open"
              items={statusFilterItems?.map((item: ISelectOptions) => {
                const { label, value } = item;
                return {
                  label: label,
                  value: value,
                };
              })}
            />
          </div>
          <div className="border rounded-full flex items-center px-2 pl-4 py-1">
            <FaRegCalendarAlt />
            <ReSelect
              dropdownStyle={{ width: "10rem" }}
              variant="borderless"
              label=""
              placeholder="Date Posted"
              noStyle
              name="created_at"
              items={dateFilterItems?.map((item: ISelectOptions) => {
                const { label, value } = item;
                return {
                  label: label,
                  value: value,
                };
              })}
            />
          </div>
          <div className="border rounded-full flex items-center px-2 pl-4 py-1">
            <CgOrganisation />
            <ReSelect
              dropdownStyle={{ width: "10rem" }}
              variant="borderless"
              label=""
              placeholder="Company"
              noStyle
              name="company_id"
              searchable
              items={companies?.map((company: { name: string; id: string }) => {
                const { name, id } = company;
                return {
                  label: name,
                  value: id,
                };
              })}
            />
          </div>
          <Button
            className="rounded-full w-24 py-5 px-10"
            type="default"
            htmlType="submit"
            onClick={() => {
              form.resetFields();
              dispatch(setSearchedQuery(null));
            }}
          >
            Rest Filter
          </Button>
          <div className="flex items-center gap-5">
            <Divider type="vertical" className="h-8 m-0" />
            {user?.unsafeMetadata?.role === "2" && (
              <Button
                onClick={handleMyJobsOptionClicks}
                icon={<FaBuildingUser />}
                className={`rounded-full relative overflow-hidden focus:outline-none peer px-4 py-5`}
                style={
                  myJobsOption
                    ? { border: "1px solid #691F74", color: "#691F74" }
                    : {}
                }
              >
                My Jobs
              </Button>
            )}
            <Button
              onClick={handleSavedJobsOptionClicks}
              icon={<FaHeart />}
              className={`rounded-full relative overflow-hidden focus:outline-none peer px-4 py-5`}
              style={
                savedJobsOption
                  ? { border: "1px solid #691F74", color: "#691F74" }
                  : {}
              }
            >
              Saved Jobs
            </Button>
          </div>
        </div>
      )}
    </ReForm>
  );
}
