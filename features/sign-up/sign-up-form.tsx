import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import countryList from "react-select-country-list";
import * as React from "react";
import sanitize from "@/lib/sanitize";
import Spinner from "@/components/spinner";
import axios from "axios";
import ensureError from "@/lib/ensure-error";
import FormInput from "@/components/authentication/auth-input";
import FormSelect from "@/components/form/form-select";
import AuthForm from "@/components/authentication/auth-form";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const options = React.useMemo(() => {
    const response = countryList().getData().map((item: any) => ({
      id: item.label.toLowerCase(),
      title: item.label
    }));
    return response;
  }, []);
  const router = useRouter();

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      password: event.currentTarget.password.value,
      name: event.currentTarget.fullname.value,
      email: event.currentTarget.email.value,
      country: event.currentTarget.country.value,
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
        phone: "undefined",
        position: "other"
      });
      toast("Registration Complete", { description: "Proceed to Login" });
      router.replace(`/register/email-verify?email=${formData.email}`);
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
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
              label="Country"
              isLoading={isLoading}
              required
              name="country"
              options={options}
              title="Country"
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

