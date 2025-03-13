import type { NEW_USER } from "@/types/user.types";
import { faker } from "@faker-js/faker";

export default function userSeed(): NEW_USER {
    return {
        country: faker.location.country(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: "test",
        phone: faker.phone.number(),
        position: "undefined"
    }
}


