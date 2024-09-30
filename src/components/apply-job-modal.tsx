import { Button } from "./ui/button";
import { AiFillThunderbolt } from "react-icons/ai";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { useAppSelector } from "../redux/hooks";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "../hooks/use-fetch";
import { applyToJob } from "../api/application";
import { useUser } from "@clerk/clerk-react";

const formSchema = z.object({
  experience_year: z
    .number()
    .min(0, { message: "Year must be at least 0" })
    .int(),
  experience_month: z
    .number()
    .min(0, { message: "Month must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills is Required!" }),
  phone_number: z.string().min(1, { message: "Phone Number is Required!" }),
  resume: z
    .any()
    .refine((file) => file[0] && file[0].type === "application/pdf"),
});

export default function ApplyJobModal() {
  const { makeRequest, loading } = useFetch(applyToJob, {});
  const { user } = useUser();
  const { selectedJob } = useAppSelector((store) => store.job);

  const {
    register,
    handleSubmit,
    // control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  console.log(errors);
  function handleFormSubmit(data: any) {
    makeRequest({
      ...data,
      job_id: selectedJob?.id,
      candidate_id: user?.id,
      name: user?.fullName,
      resume: data?.resume[0],
    });
    reset();
  }
  return (
    <Dialog>
      <DialogTrigger className="w-0">
        <Button size="sm" className="mt-2 h-9 flex gap-1 rounded-full">
          <AiFillThunderbolt className="mt-[3px]" /> <p>Quick Apply</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        title={`Apply to ${selectedJob?.company?.name}`}
        className="w-[35rem] p-5"
      >
        <form className="grid gap-5" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* <div className="flex gap-2">
            <div className="flex flex-col gap-2.5 w-full">
              <Label htmlFor="firstName">First Name</Label>
              <div className="grid gap-1">
                <Input type="text" {...register("firstName")} />
                {errors?.firstName && (
                  <p className="text-red-500 text-xs">
                    {String(errors?.firstName?.message)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="grid gap-1">
                <Input type="text" {...register("lastName")} />
                {errors?.lastName && (
                  <p className="text-red-500 text-xs">
                    {String(errors?.lastName?.message)}
                  </p>
                )}
              </div>
            </div>
          </div> */}
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="resume">Resume</Label>
            <div className="grid gap-1">
              <Input type="file" accept=".pdf" {...register("resume")} />

              {errors?.resume && (
                <p className="text-red-500 text-xs">
                  {String(errors?.resume?.message)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="experience">Experience</Label>
            <div className="flex gap-2">
              <div className="grid gap-1 w-full">
                <Input
                  type="number"
                  {...register("experience_year", {
                    valueAsNumber: true,
                  })}
                  placeholder="Year"
                />
                {errors?.experience_year && (
                  <p className="text-red-500 text-xs">
                    {String(errors?.experience_year?.message)}
                  </p>
                )}
              </div>
              <div className="grid gap-1 w-full">
                <Input
                  type="number"
                  {...register("experience_month", {
                    valueAsNumber: true,
                  })}
                  placeholder="Month"
                />
                {errors?.experience_month && (
                  <p className="text-red-500 text-xs">
                    {String(errors?.experience_month?.message)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="skills">Skills</Label>
            <div className="grid gap-1">
              <Input type="text" {...register("skills")} />
              {errors?.skills && (
                <p className="text-red-500 text-xs">
                  {String(errors?.skills?.message)}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <div className="grid gap-1">
              <Input type="text" {...register("phone_number")} />
              {errors?.phone_number && (
                <p className="text-red-500 text-xs">
                  {String(errors?.phone_number?.message)}
                </p>
              )}
            </div>
          </div>
          <DialogClose asChild>
            <Button
              loading={loading}
              disabled={Object.keys(errors).length > 0 ? true : false}
              type="submit"
            >
              Apply
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
