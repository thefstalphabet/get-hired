import { Skeleton } from "antd";

export default function JobCardSkeleton() {
  return (
    <div
      className="flex p-5 gap-6 border rounded-lg h-[253px]"
      style={{ backgroundColor: "#e0e0e6" }}
    >
      <Skeleton.Image className="h-[3rem] w-[3rem] border rounded-md" />
      <div className="grid gap-10">
        <Skeleton.Button className="h-2 w-[250px]" />
        <Skeleton className="h-2 w-[400px]" />
        <Skeleton className="h-2 w-[400px]" />
      </div>
    </div>
  );
}
