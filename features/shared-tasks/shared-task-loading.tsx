import { Skeleton } from "@/components/ui/skeleton";

export default function SharedTaskLoading() {
  return (
    <div className="w-full flex flex-col border h-[360px] rounded py-7 px-3 space-y-6 bg-slate-200">
      <Skeleton className="h-4 w-[40%]" />

      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 w-[75%]">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>

      <div className="flex grow items-end justify-end">
        <Skeleton className="h-4 w-[20%]" />
      </div>
    </div>
  )
}

