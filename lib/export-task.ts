import type { TASK } from "@/types/task.types";
import exportJson from "./export-json";

export default function exportTask(data: TASK[]) {
  const corrected = data.map((item) => {
    const updatedUser = {
      email: item.createdBy.email,
      name: item.createdBy.name,
      avatar: item.createdBy.avatar
    }
    const updated = {
      ...item,
      createdBy: updatedUser
    }
    return updated;
  });
  corrected.forEach((item) => {
    const item_title = item.title.toLowerCase().replaceAll(" ", "-");
    exportJson(JSON.parse(JSON.stringify(item)), item_title);
  });
}

