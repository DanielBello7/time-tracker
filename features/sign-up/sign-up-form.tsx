import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import AuthForm from "@/components/auth/auth-form";
import FormInput from "@/components/auth/auth-input";
import FormSelect from "@/components/form/form-select";
import sanitize from "@/lib/sanitize";
import { toast } from "sonner";
import { role_options } from "./role-options";
import Spinner from "@/components/spinner";
import axios from "axios";
import ensureError from "@/lib/ensure-error";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name: event.currentTarget.fullname.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      role: event.currentTarget.userRole.value,
    }
    if (!sanitize(formData)) {
      return toast("Incomplete data", {
        description: "You have incomplete required fields"
      });
    }
    setIsLoading(true);
    try {
      await axios.post("/api/users", {
        ...formData,
        phone: "unknown",
        country: "nigeria"
      });
      toast("Registration Complete", { description: "Proceed to Login" });
      router.replace("/sign-in");
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    } finally {
      return setIsLoading(false);
    }
  }
  return (
    <AuthForm type="sign-up">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form id="sign-up-form" onSubmit={onsubmit}>
            <FormInput
              title="Name"
              name="fullname"
              placeholder="John Doe"
              type="text"
              isLoading={isLoading}
              required
            />
            <FormInput
              title="Email"
              name="email"
              placeholder="email@example.com"
              type="email"
              isLoading={isLoading}
              required
            />
            <FormInput
              title="Password"
              name="password"
              required
              placeholder="****************"
              type="password"
              isLoading={isLoading}
            />
            <FormSelect
              label="Role"
              isLoading={isLoading}
              required
              name="userRole"
              options={role_options}
              title="Role"
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={isLoading && true} form="sign-up-form">
            {isLoading ? <Spinner /> : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </AuthForm >
  )
}

