import type { NEW_TASK } from "@/types/task.types";
import { faker } from "@faker-js/faker";
import moment from "moment";

export default function taskSeed(
    daysAgoFinished: string = moment().add(0, "days").toISOString(),
    type?: "bug" | "story",
): NEW_TASK {

    const random = Math.floor(Math.random() * 10);
    const tags = Array.from(new Array(random), () => faker.word.words({ count: 1 }));
    const interval = (["seconds", "minutes", "hours"] as const)[Math.floor(Math.random() * 2)];
    const selectedType = (["bug", "story"] as const)[Math.floor(Math.random() * 1)];

    return {
        body: faker.lorem.paragraphs(4),
        tags,
        timeInterval: interval,
        timeSpent: Math.floor(Math.random() * 20),
        title: faker.lorem.sentence(),
        type: type ?? selectedType,
        dateStarted: moment(daysAgoFinished).add(-3, "days").toISOString(),
        dateFinished: daysAgoFinished
    }
}


