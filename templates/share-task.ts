import { EXTERNAL_SHARED_TASK } from "@/types/external-shared.types";
import { variables } from "@/constants";

export default function shareTask(external: EXTERNAL_SHARED_TASK) {
    return `
        You've been shared an activity task by ${external.sharedBy.name}, ${external.sharedBy.email}.
        Please click the link below - ${variables.ENV.NEXT_AUTH_URL}/${external._id}.
    `
}

