import { useAppDispatch } from "@/store/hooks";
import { setCurrentUser } from "@/store/user-slice";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import axios from "axios";
import * as React from "react";
import ensureError from "@/lib/ensure-error";

export default function useFetchResources() {
    const [isLoading, setIsLoading] = React.useState(true);
    const dispatch = useAppDispatch();

    const getUserDetails = React.useCallback(async () => {
        try {
            const session = await getSession();
            if (!session) throw new Error("session unavailable");
            const response = await axios.get(`/api/users?email=${session.user?.email}`);
            const userinformation = response.data.payload;
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

