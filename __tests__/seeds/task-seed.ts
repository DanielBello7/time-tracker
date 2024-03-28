import type { NEW_TASK } from "@/types/task.types";
import { faker } from "@faker-js/faker";

export default function taskSeed(
    daysAgoFinished: number = 0, daysAgoStarted: number = 0
): NEW_TASK {
    const random = Math.floor(Math.random() * 10);
    const tags = Array.from(new Array(random), () => {
        return faker.word.words({ count: 1 });
    });

    const interval = ["seconds", "minutes", "hours"][Math.floor(Math.random() * 2)] as any;

    const type = ["bug", "story"][Math.floor(Math.random() * 1)] as any;

    return {
        body: faker.lorem.paragraphs(4),
        dateFinished: faker.date.recent({
            days: daysAgoFinished ?? 0
        }).toISOString(),
        dateStarted: faker.date.recent({
            days: daysAgoStarted ? -daysAgoStarted : Math.floor(Math.random() * 10)
        }).toISOString(),
        tags,
        timeInterval: interval,
        timeSpent: Math.floor(Math.random() * 20),
        title: faker.lorem.sentence(),
        type
    }
}


