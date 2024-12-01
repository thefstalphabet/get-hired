import { Skeleton } from "antd";

export default function JobCardSkeleton() {
  return (
    <div
      className="p-5 gap-6 border rounded-lg h-[18rem]"
      style={{ backgroundColor: "#e0e0e6" }}
    >
      <Skeleton.Button className="border rounded-md" />
      <div className="grid gap-10 mt-3">
        <Skeleton className="h-2 w-[400px]" />
      </div>
    </div>
  );
}
