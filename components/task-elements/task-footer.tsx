import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TaskFooter() {
  return (
    <div className="flex justify-end">
      <Button variant={"link"} className="underline"
        type="button">More
      </Button>
    </div>
  )
}

