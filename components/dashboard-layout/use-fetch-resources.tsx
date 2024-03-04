import { useAppDispatch } from "@/store/hooks";
import { setCurrentUser } from "@/store/user-slice";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import * as React from "react";
import ensureError from "@/lib/ensure-error";
import findUserUsingUseremail from "@/apis/find-user-using-useremail";

export default function useFetchResources() {
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useAppDispatch();

    const getUserDetails = React.useCallback(async () => {
        try {
            const session = await getSession();
            if (!session) throw new Error("session unavailable");
            const response = await findUserUsingUseremail(session.user?.email!)
            const userinformation = response;
            dispatch(setCurrentUser(userinformation));
        } catch (error) {
            const err = ensureError(error);
            toast("Error occured", { description: err.message });
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        getUserDetails();
    }, []);

    return { isLoading }
}

