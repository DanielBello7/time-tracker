import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TaskFooter() {
  return (
    <div className="flex justify-end">
      <Link href="/dashboard/shared-tasks/1">
        <Button variant={"link"} className="underline">
          More
        </Button>
      </Link>
    </div>
  )
}

