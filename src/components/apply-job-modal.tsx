import { Button } from "./ui/button";
import { AiFillThunderbolt } from "react-icons/ai";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useAppSelector } from "../redux/hooks";

export default function ApplyJobModal() {
  const { selectedJob } = useAppSelector((store) => store.job);

  function handleFormSubmit() {}
  return (
    <Dialog>
      <DialogTrigger className="w-0">
        <Button size="sm" className="mt-2 h-9 flex gap-1 rounded-full">
          <AiFillThunderbolt className="mt-[3px]" /> <p>Quick Apply</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        title={`Apply to ${selectedJob?.company?.name}`}
        className="h-[35rem] w-[35rem] p-5"
      >
        <form className="grid gap-5" onSubmit={handleFormSubmit}>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2.5 w-full">
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" name="firstName" />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <Label htmlFor="lastName">Last Name</Label>
              <Input type="text" name="lastName" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="resume">Resume</Label>
            <Input type="file" accept=".pdf" name="resume" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="experienceYears">Experience Years</Label>
            <div className="flex gap-2">
              <Input type="number" name="years" placeholder="Years" />
              <Input type="number" name="months" placeholder="Months" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="skills">Skills</Label>
            <Input type="text" name="skills" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input type="text" name="phoneNumber" />
          </div>
          <Button type="submit">Apply</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
