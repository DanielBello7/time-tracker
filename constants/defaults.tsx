import type { NEW_TASK } from "@/types/task.types";
import moment from "moment";

export const newBugTask: NEW_TASK = {
    body: `Adding descriptions about the bug you encountered can help utilize this task manager effectively, begin by organizing tasks into categories. Prioritize tasks based on urgency and importance, setting deadlines if applicable. Regularly update task statuses just incase you made mistakes. Utilize reminders or notifications to stay on track and meet deadlines. Collaborate with team members by sharing tasks even with those who aren't registered. Finally, periodically review and watch metrics about improvements on tasks as needed to optimize productivity and achieve goals efficiently.`,
    dateFinished: moment().startOf("week").add(-3, "days").toISOString(),
    dateStarted: moment().startOf("week").add(-3, "days").toISOString(),
    tags: ["bugs", "primary", "initial", "beginning", "user"],
    title: "Utilizing Bug Tasks",
    type: "bug",
    timeSpent: 10,
    timeInterval: "minutes",
}

export const newStoryTask: NEW_TASK = {
    body: `In the heart of an enchanted forest, whispers of a forgotten legend resurface. A mysterious map, said to lead to a realm of untold treasures, falls into the hands of an unlikely duo: a spirited young wanderer and a reclusive scholar with a secret past. As they embark on an epic journey fraught with peril and magic, they unravel ancient mysteries and confront mythical creatures. Along the way, they discover the true power of friendship, courage, and the extraordinary resilience of the human spirit. Their adventure unfolds, weaving a tale of wonder, danger, and the enduring quest for discovery.`,
    dateFinished: moment().startOf("week").add(-3, "days").toISOString(),
    dateStarted: moment().startOf("week").add(-3, "days").toISOString(),
    tags: ["stories", "magic", "legend", "treasures", "spirit", "mystery", "new user"],
    title: "Your First Story",
    type: "story",
    timeSpent: 3,
    timeInterval: "minutes",
}


