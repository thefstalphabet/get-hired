import { useEffect } from "react";
import { State } from "country-state-city";
import { getCompanies } from "../api/company";
import useFetch from "../hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Button, Form } from "antd";
import ReForm from "../reusable-antd-components/ReForm";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";
import ReSelect from "../reusable-antd-components/ReFormFields/ReSelect";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

type FIlterType = "small" | "big";
export interface ISearchQuery {
  title: string;
  location: string;
  companyId: string;
  date: string;
}

const dateFilterItems = [
  {
    title: "Last 24 Hours",
    value: "last_24_hours",
  },
  {
    title: "Last 3 Days",
    value: "last_3_days",
  },
  {
    title: "Last 7 Days",
    value: "last_7_days",
  },
  {
    title: "Last 14 Days",
    value: "last_14_days",
  },
  {
    title: "Anytime",
    value: "anytime",
  },
];

export default function JobsFilter(props: {
  type: FIlterType;
  handleSearchSubmit: Function;
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
            borderLess={false}
            noStyle
            label=""
            name="title"
            type="simple"
            placeholder="Job Title"
          />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-base whitespace-nowrap font-bold">
            Where?
          </label>
          <ReSelect
            placeholder="Job Location"
            borderLess={false}
            className="w-80"
            noStyle
            label=""
            name="location"
            searchable
            items={State.getStatesOfCountry("IN").map((city: any) => {
              const { name } = city;
              return {
                title: name,
                value: name,
              };
            })}
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
              borderLess={false}
              label="Date"
              placeholder="Anytime"
              noStyle
              name="date"
              searchable
              items={dateFilterItems?.map((item: any) => {
                const { title, value } = item;
                return {
                  title: title,
                  value: value,
                };
              })}
            />
          </div>
          <div className="border rounded-full flex items-center px-2 pl-4 py-1">
            <GoOrganization />
            <ReSelect
              dropdownStyle={{ width: "10rem" }}
              borderLess={false}
              label="Job Location"
              placeholder="Company"
              noStyle
              name="companyId"
              searchable
              items={[]?.map((company: any) => {
                const { name, id } = company;
                return {
                  title: name,
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
    //   </div>
    //   {type === "big" && (
    //     <div className="flex items-center justify-center gap-5">
    //       <Select
    //         value={searchQuery?.companyId}
    //         onValueChange={(value: string) => {
    //           setSearchQuery((prev: any) => {
    //             return {
    //               ...prev,
    //               companyId: String(value),
    //             };
    //           });
    //         }}
    //       >
    //         <SelectTrigger className="rounded-full w-32">
    //           <GoOrganization />
    //           <SelectValue placeholder="Company" />
    //         </SelectTrigger>
    //         <SelectContent className="w-80">
    //           <SelectGroup>
    //             {companies?.map((company: any) => {
    //               const { name, id } = company;
    //               return (
    //                 <SelectItem value={String(id)} key={id}>
    //                   {name}
    //                 </SelectItem>
    //               );
    //             })}
    //           </SelectGroup>
    //         </SelectContent>
    //       </Select>
    //       <div className="flex items-center justify-center gap-5">
    //         <Select onValueChange={handleDateFilterChange}>
    //           <SelectTrigger className="rounded-full w-36">
    //             <FaRegCalendarAlt />
    //             <SelectValue placeholder="Date Posted" />
    //           </SelectTrigger>
    //           <SelectContent className="w-80">
    //             <SelectGroup>
    //               <SelectItem value="anytime" key="anytime">
    //                 Anytime
    //               </SelectItem>
    //               <SelectItem value="last_24_hours" key="last_24_hours">
    //                 Last 24 Hours
    //               </SelectItem>
    //               <SelectItem value="last_3_days" key="last_3_days">
    //                 Last 3 Days
    //               </SelectItem>
    //               <SelectItem value="last_7_days" key="last_7_days">
    //                 Last 7 Days
    //               </SelectItem>
    //               <SelectItem value="last_14_days" key="last_14_days">
    //                 Last 14 Days
    //               </SelectItem>
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //       <Button
    //         className="rounded-full w-28"
    //         variant="secondary"
    //         onClick={handleClearFilterClicks}
    //       >
    //         Clear Filters
    //       </Button>
    //     </div>
    //   )}
    // </form>
  );
}
