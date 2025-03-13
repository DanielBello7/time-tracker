import { variables } from "@/constants";

export default function isTestMode(): Boolean {
    if (variables.ENV.TESTING === "test") return true;
    return false;
}


