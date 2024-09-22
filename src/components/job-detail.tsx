import { useAppSelector } from "../redux/Hooks";
import { Button } from "./ui/button";
import { AiFillThunderbolt } from "react-icons/ai";

export default function JobDetail() {
  const { selectedJob } = useAppSelector((store) => store.job);
  return selectedJob ? (
    <div className="bg-white p-5 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-start gap-7 mb-5">
        <img
          className="h-[3rem] border p-2 rounded-md"
          src={selectedJob?.company.logo_url}
          alt="company logo"
        />
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{selectedJob?.title}</h1>
          </div>
          <h4 style={{ color: "#691F74" }} className="font-semibold">
            {selectedJob?.company.name}
          </h4>
          <p>{selectedJob?.location}</p>
          <Button size="sm" className="mt-2">
            <AiFillThunderbolt className="mt-[3px]" /> <p>Quick Apply</p>
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-5 mt-5 h-[90vh] overflow-y-scroll hide-scrollbar">
        <div>
          <h1 className="text-lg font-semibold">Description:</h1>
          <p style={{ color: "#676767" }}>{selectedJob?.description}</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Requirments:</h1>
          <p style={{ color: "#676767" }}>{selectedJob?.requirements}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
