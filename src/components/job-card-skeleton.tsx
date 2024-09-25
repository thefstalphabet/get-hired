import { Skeleton } from './ui/skeleton'

export default function JobCardSkeleton() {
  return (
    <div
          className="flex p-5 gap-6 border rounded-lg h-[210px]"
          style={{ backgroundColor: "#e0e0e6" }}
        >
          <Skeleton className="h-[3rem] w-[3rem] border rounded-md" />
          <div className="grid gap-2">
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-2 w-[500px]" />
            <Skeleton className="h-2 w-[500px]" />
            <Skeleton className="h-2 w-[500px]" />
            <Skeleton className="h-2 w-[500px]" />
            <Skeleton className="h-2 w-[50px]" />
          </div>
        </div>
  )
}
