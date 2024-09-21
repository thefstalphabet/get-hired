import { useEffect } from "react";
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

type FIlterType = "small" | "big";

export default function JobsFilter(props: {
  handleSearch: any;
  type: FIlterType;
}) {
  const { handleSearch, type } = props;
  const { isLoaded } = useUser();

  const { makeRequest, data: companies, loading } = useFetch(getCompanies, {});
  console.log(companies);

  useEffect(() => {
    makeRequest();
  }, [isLoaded]);

  return (
    <form className="grid gap-5">
      <div className="flex gap-4 border py-3 px-10 items-center justify-center bg-white rounded-full">
        <div className="flex items-center gap-3">
          <Label htmlFor="search-query" className="text-base whitespace-nowrap">
            Job Title
          </Label>
          <Input
            className="w-96"
            onSubmit={handleSearch}
            type="text"
            placeholder="Search job by title"
            name="search-query"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="location" className="text-base whitespace-nowrap">
            Job Location
          </Label>
          <Select onValueChange={(value: string) => {}}>
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
          <Select onValueChange={(value: string) => {}}>
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
          <Button
            type="submit"
            className="rounded-full w-28"
            variant="secondary"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </form>
  );
}
