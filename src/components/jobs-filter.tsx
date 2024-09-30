import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { State } from "country-state-city";
import { getCompanies } from "../api/company";
import useFetch from "../hooks/use-fetch";
import { Label } from "./ui/label";
import { GoOrganization } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

type FIlterType = "small" | "big";
export interface ISearchQuery {
  title: string;
  location: string;
  companyId: string;
  date: string;
}

export default function JobsFilter(props: {
  type: FIlterType;
  handleSearchSubmit: Function;
  loading?: boolean;
}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const { type, handleSearchSubmit, loading } = props;
  const { data: companies } = useFetch(getCompanies, {});
  const [searchQuery, setSearchQuery] = useState<ISearchQuery | null>(null);
  function handleClearFilterClicks() {
    setSearchQuery(null);
  }

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
    setSearchQuery((prev: any) => {
      return {
        ...prev,
        date: startDate,
      };
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!isSignedIn) {
      return navigate("/?sign-in=true");
    }
    handleSearchSubmit(searchQuery);
  };

  useEffect(() => {
    if (query) {
      const searchQuery = JSON.parse(query);
      setSearchQuery((prev: any) => {
        return {
          ...prev,
          location: searchQuery?.jobLocation,
          title: searchQuery?.jobTitle,
        };
      });
    }
  }, [query]);

  return (
    <form className="grid gap-5" onSubmit={handleFormSubmit}>
      <div className="flex gap-4 border py-3 px-10 items-center justify-center bg-white rounded-full">
        <div className="flex items-center gap-3">
          <Label htmlFor="search-query" className="text-base whitespace-nowrap">
            Job Title
          </Label>
          <Input
            className="w-96"
            type="text"
            placeholder="Search job by title"
            name="search-query"
            value={searchQuery?.title}
            onChange={(e) => {
              setSearchQuery((prev: any) => {
                return {
                  ...prev,
                  title: e.target.value,
                };
              });
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="location" className="text-base whitespace-nowrap">
            Job Location
          </Label>
          <Select
            value={searchQuery?.location}
            onValueChange={(value: string) => {
              setSearchQuery((prev: any) => {
                return {
                  ...prev,
                  location: value,
                };
              });
            }}
          >
            <SelectTrigger className="w-96">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => {
                  return (
                    <SelectItem value={name} key={name}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button loading={loading} type="submit" className="rounded-full w-28">
          Find Jobs
        </Button>
      </div>
      {type === "big" && (
        <div className="flex items-center justify-center gap-5">
          <Select
            value={searchQuery?.companyId}
            onValueChange={(value: string) => {
              setSearchQuery((prev: any) => {
                return {
                  ...prev,
                  companyId: String(value),
                };
              });
            }}
          >
            <SelectTrigger className="rounded-full w-32">
              <GoOrganization />
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent className="w-80">
              <SelectGroup>
                {companies?.map((company: any) => {
                  const { name, id } = company;
                  return (
                    <SelectItem value={String(id)} key={id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center justify-center gap-5">
            <Select onValueChange={handleDateFilterChange}>
              <SelectTrigger className="rounded-full w-36">
                <FaRegCalendarAlt />
                <SelectValue placeholder="Date Posted" />
              </SelectTrigger>
              <SelectContent className="w-80">
                <SelectGroup>
                  <SelectItem value="anytime" key="anytime">
                    Anytime
                  </SelectItem>
                  <SelectItem value="last_24_hours" key="last_24_hours">
                    Last 24 Hours
                  </SelectItem>
                  <SelectItem value="last_3_days" key="last_3_days">
                    Last 3 Days
                  </SelectItem>
                  <SelectItem value="last_7_days" key="last_7_days">
                    Last 7 Days
                  </SelectItem>
                  <SelectItem value="last_14_days" key="last_14_days">
                    Last 14 Days
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="rounded-full w-28"
            variant="secondary"
            onClick={handleClearFilterClicks}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </form>
  );
}
