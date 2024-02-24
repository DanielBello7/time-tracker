import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { updateUser } from "@/store/user-slice"
import * as React from "react";
import useMultistep from "@/hooks/use-multi-form";
import EnterNewEmail from "./enter-new-email";
import SecurityConfirmation from "./security-confirmation";
import EnterOTP from "./enter-otp";
import ensureError from "@/lib/ensure-error";
import passwordAuth from "@/apis/password-auth";
import updateEmail from "@/apis/update-email";
import sendOtp from "@/apis/send-otp";
import { Button } from "@/components/ui/button";
import isEmailRegistered from "@/apis/is-email-registered";

const initialFormData = {
  newEmail: "",
  otp: "",
  currentEmail: "",
  passowrd: "",
  confirmOTP: "",
}

export default function EmailUpdate() {
  const { email, _id } = useAppSelector((state) => state.user.user);
  const [formData, setFormData] = React.useState(initialFormData);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const { step, Next, currentStepIndex, GoTo } = useMultistep([
    <SecurityConfirmation
      currentEmail={formData.currentEmail}
      onEmailChange={(e) => setFormData({ ...formData, currentEmail: e })}
      onPasswordChange={(e) => setFormData({ ...formData, passowrd: e })}
      password={formData.passowrd}
      isLoading={isLoading}
    />,
    <EnterNewEmail
      onchange={(e) => setFormData({ ...formData, newEmail: e })}
      value={formData.newEmail}
      isLoading={isLoading}
    />,
    <EnterOTP
      onchange={(e) => setFormData({ ...formData, confirmOTP: e })}
      value={formData.confirmOTP}
      newEmail={formData.newEmail}
      isLoading={isLoading}
      changeOTP={(e) => setFormData({ ...formData, otp: e })}
    />
  ]);

  const onsubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        setIsLoading(true);
        if (!formData.currentEmail.trim() || !formData.passowrd.trim()) {
          toast("Error occured", { description: "Incomplete fields" });
        }
        const response = await passwordAuth(_id, formData.passowrd);
        if (formData.currentEmail === email && response) {
          setIsLoading(false);
          return Next();
        }
        setIsLoading(false);
        toast("Error occured", { description: "Incorrect credentials" });
      } else if (currentStepIndex === 1) {
        setIsLoading(true);
        const res = await isEmailRegistered(formData.newEmail);
        if (res) {
          setIsLoading(false);
          return toast("Error occured", { description: "Email already registered" });
        }
        const otp = Math.floor(Math.random() * 999999).toString();
        setFormData({ ...formData, otp: otp });
        await sendOtp(otp, formData.newEmail);
        setIsLoading(false);
        return Next();
      } else if (currentStepIndex === 2) {
        setIsLoading(true);
        if (formData.confirmOTP !== formData.otp) {
          setIsLoading(false);
          return toast("Error occured", { description: "Incorrect otp" });
        } else {
          await updateEmail(_id, formData.newEmail);
          toast("Email Updated");
          GoTo(0);
          dispatch(updateUser({ email: formData.newEmail }));
          setIsLoading(false);
          return setFormData(initialFormData);
        }
      }
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    }
  }

  return (
    <div className="my-5 w-full">
      <form onSubmit={onsubmit} className="w-full block md:grid md:grid-cols-2 gap-3">
        {step}
        <div className="w-full col-span-2 mt-5">
          <Button variant={"secondary"} className="w-3/12"
            size={"sm"}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

