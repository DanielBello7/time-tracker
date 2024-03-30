import type { NEW_TASK } from "@/types/task.types";
import { faker } from "@faker-js/faker";
import moment from "moment";

export default function taskSeed(
    daysAgoFinishedOffset: number = 0,
    daysAgoStartedOffset: number = -1,
    createdAt?: Date,
    type?: "bug" | "story"
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
        dateStarted: moment().add(daysAgoStartedOffset, "days").toISOString(),
        dateFinished: moment().add(daysAgoFinishedOffset, "days").toISOString(),
        createdAt
    }
}


