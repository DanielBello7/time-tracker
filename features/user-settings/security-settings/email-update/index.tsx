import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { updateUser } from "@/store/user-slice"
import { Button } from "@/components/ui/button";
import * as React from "react";
import ensureError from "@/lib/ensure-error";
import passwordAuth from "@/apis/password-auth";
import updateEmail from "@/apis/update-email";
import sendOtp from "@/apis/send-otp";
import isEmailRegistered from "@/apis/is-email-registered";
import useEmailUpdatePages from "./use-email-update-pages";
import validateOtp from "@/apis/validate-otp";
import Spinner from "@/components/spinner";

const initialFormData = {
  newEmail: "",
  currentEmail: "",
  passowrd: "",
  confirmOTP: "",
}

export default function EmailUpdate() {
  const { email, _id } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const {
    currentStepIndex,
    setIsLoading,
    setFormData,
    formData,
    Next,
    GoTo,
    isLoading,
    step
  } = useEmailUpdatePages(initialFormData);

  const handleInitial = async () => {
    setIsLoading(true);
    if (!formData.currentEmail.trim() || !formData.passowrd.trim()) {
      throw new Error("Incomplete Fields");
    }
    const response = await passwordAuth(_id, formData.passowrd);
    if (formData.currentEmail !== email || !response) {
      throw new Error("Invalid Credentials");
    }
    setIsLoading(false);
    return Next();
  }

  const handleConfirmation = async () => {
    setIsLoading(true);
    const confirmation = await isEmailRegistered(formData.newEmail);
    if (confirmation) throw new Error("Email Unavailable");
    await sendOtp(formData.newEmail);
    setIsLoading(false);
    return Next();
  }

  const handleFinal = async () => {
    setIsLoading(true);
    await validateOtp(formData.confirmOTP);
    await updateEmail(_id, formData.newEmail);
    toast("Email Updated");
    GoTo(0);
    dispatch(updateUser({ email: formData.newEmail }));
    setIsLoading(false);
    return setFormData(initialFormData);
  }

  const onsubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        return await handleInitial();
      } else if (currentStepIndex === 1) {
        return handleConfirmation();
      } else if (currentStepIndex === 2) {
        return await handleFinal();
      }
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    } finally {
      return setIsLoading(false);
    }
  }

  return (
    <div className="my-5 w-full">
      <form onSubmit={onsubmit} className="w-full block md:grid md:grid-cols-2 gap-3">
        {step}
        <div className="w-full col-span-2 mt-5">
          <Button variant={"secondary"} className="w-3/12" size={"sm"} disabled={isLoading && true}>
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

