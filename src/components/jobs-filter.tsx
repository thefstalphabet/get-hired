import { useEffect } from "react";
import { State } from "country-state-city";
import { getCompanies } from "../api/company";
import useFetch from "../hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button, Form } from "antd";
import ReForm from "../reusable-antd-components/ReForm";
import ReSelect, {
  ISelectOptions,
} from "../reusable-antd-components/ReFormFields/ReSelect";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";

type FIlterType = "small" | "big";
export interface ISearchQuery {
  title: string;
  location: string;
  companyId: string;
  date: string;
}

const dateFilterItems: ISelectOptions[] = [
  {
    label: "Last 24 Hours",
    value: "last_24_hours",
  },
  {
    label: "Last 3 Days",
    value: "last_3_days",
  },
  {
    label: "Last 7 Days",
    value: "last_7_days",
  },
  {
    label: "Last 14 Days",
    value: "last_14_days",
  },
  {
    label: "Anytime",
    value: "anytime",
  },
];

export default function JobsFilter(props: {
  type: FIlterType;
  handleSearchSubmit: (searchQuery: ISearchQuery) => void;
  loading?: boolean;
}) {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const { type, handleSearchSubmit, loading } = props;
  const { data: companies } = useFetch(getCompanies, {});

  const handleDateFilterChange = (value: string) => {
    const currentDate = new Date();

    let startDate;
    switch (value) {
      case "last_24_hours":
        startDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "last_3_days":
        startDate = new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case "last_7_days":
        startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "last_14_days":
        startDate = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000);
        break;
      case "anytime":
      default:
        startDate = null; // No filtering
        break;
    }
    form.setFieldValue("date", startDate);
  };

  const handleFormSubmit = (values: any) => {
    if (!isSignedIn) {
      return navigate("/?sign-in=true");
    }
    handleSearchSubmit(values);
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

  return (
    <ReForm
      formInstance={form}
      onSubmit={handleFormSubmit}
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
            className="w-80"
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
          className="rounded-full w-28 py-5 px-10"
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
      {type === "big" && (
        <div className="flex items-center justify-center gap-5">
          <div className="border rounded-full flex items-center px-2 pl-4 py-1">
            <FaRegCalendarAlt />
            <ReSelect
              dropdownStyle={{ width: "10rem" }}
              variant="borderless"
              label="Date"
              placeholder="Anytime"
              noStyle
              name="date"
              searchable
              onChange={handleDateFilterChange}
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
            <GoOrganization />
            <ReSelect
              dropdownStyle={{ width: "10rem" }}
              variant="borderless"
              label="Job Location"
              placeholder="Company"
              noStyle
              name="companyId"
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
            onClick={() => {
              form.resetFields();
            }}
          >
            Rest Filter
          </Button>
        </div>
      )}
    </ReForm>
  );
}
