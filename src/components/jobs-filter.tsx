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
import { useUser } from "@clerk/clerk-react";
import { Label } from "./ui/label";
import { GoOrganization } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

type FIlterType = "small" | "big";

export default function JobsFilter(props: { type: FIlterType }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { type } = props;
  const { isLoaded } = useUser();
  const navigate = useNavigate();
  const { makeRequest, data: companies } = useFetch(getCompanies, {});

  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobCompany, setJobCompany] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  function handleSearchSubmit(e: any) {
    e.preventDefault();
    navigate(
      `/job-search?query=${JSON.stringify({
        jobTitle: jobTitle,
        jobLocation: jobLocation,
      })}`
    );
  }

  function handleClearFilterClicks() {
    setJobLocation("");
    setJobTitle("");
    navigate(`/job-search`);
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
    setDateFilter(startDate);
  };

  useEffect(() => {
    makeRequest();
  }, [isLoaded]);

  useEffect(() => {
    if (query) {
      const searchQuery = JSON.parse(query);
      setJobLocation(searchQuery?.jobLocation);
      setJobTitle(searchQuery?.jobTitle);
    }
  }, [query]);

  return (
    <form className="grid gap-5" onSubmit={handleSearchSubmit}>
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
            value={jobTitle}
            onChange={(e) => {
              setJobTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="location" className="text-base whitespace-nowrap">
            Job Location
          </Label>
          <Select
            value={jobLocation}
            onValueChange={(value: string) => {
              setJobLocation(value);
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
        <Button type="submit" className="rounded-full w-28">
          Find Jobs
        </Button>
      </div>
      {type === "big" && (
        <div className="flex items-center justify-center gap-5">
          <Select
            value={jobCompany}
            onValueChange={(value: string) => {
              setJobCompany(value);
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
                    <SelectItem value={name} key={id}>
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
