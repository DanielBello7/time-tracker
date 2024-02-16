import joi from "joi";
import router from "@/lib/router";
import BaseError from "@/lib/base-error";
import handleError from "@/lib/handle-error";


export default router.handler({ onError: handleError });
