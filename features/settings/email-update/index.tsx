import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { updateUser } from "@/store/user-slice"
import * as React from "react";
import useMultistep from "./use-multi-form";
import EnterNewEmail from "./enter-new-email";
import SecurityConfirmation from "./security-confirmation";
import EnterOTP from "./enter-otp";
import ensureError from "@/lib/ensure-error";
import passwordAuth from "@/apis/password-auth";
import updateEmail from "@/apis/update-email";
import sendOtp from "@/apis/send-otp";

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
  const dispatch = useAppDispatch();

  const { step, Next, currentStepIndex, GoTo } = useMultistep([
    <SecurityConfirmation
      currentEmail={formData.currentEmail}
      onEmailChange={(e) => setFormData({ ...formData, currentEmail: e })}
      onPasswordChange={(e) => setFormData({ ...formData, passowrd: e })}
      password={formData.passowrd}
    />,
    <EnterNewEmail
      onchange={(e) => setFormData({ ...formData, newEmail: e })}
      value={formData.newEmail}
    />,
    <EnterOTP
      onchange={(e) => setFormData({ ...formData, confirmOTP: e })}
      value={formData.newEmail}
    />
  ]);

  const onsubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (currentStepIndex === 0) {
        if (!formData.currentEmail.trim() || !formData.passowrd.trim()) {
          toast("Error occured", { description: "Incomplete fields" });
        } else {
          const response = await passwordAuth(_id, formData.passowrd);
          if (formData.currentEmail === email && response) return Next();
          toast("Error occured", { description: "Incorrect Credentials" });
        }
      } else if (currentStepIndex === 1) {
        const otp = Math.floor(Math.random() * 999999).toString();
        setFormData({ ...formData, otp: otp });
        await sendOtp(otp, formData.newEmail);
        return Next();
      } else if (currentStepIndex === 2) {
        if (formData.confirmOTP !== formData.otp) {
          return toast("Error occured", { description: "Incorrect otp" });
        } else {
          await updateEmail(_id, formData.newEmail);
          toast("Email Updated");
          GoTo(0);
          dispatch(updateUser({ email: formData.newEmail }));
          return setFormData(initialFormData);
        }
      }
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    }
  }

  return (
    <div className="my-5">
      <form onSubmit={onsubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step}
      </form>
    </div>
  )
}

