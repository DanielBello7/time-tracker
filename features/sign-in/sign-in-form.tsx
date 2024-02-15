import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "@/components/auth/auth-form";
import FormInput from "@/components/auth/auth-input";
import sanitize from "@/lib/sanitize";
import ensureError from "@/lib/ensure-error";
import Spinner from "@/components/spinner";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value
    }
    if (!sanitize(formData)) {
      return toast("Incomplete fields", {
        description: "Either the email or password has incomplete values"
      });
    }
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        ...formData,
        redirect: false
      });
      if (response?.error) throw response.error
      router.replace("/dashboard");
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <AuthForm type="sign-in">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign in to your account here. Click continue when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form id="sign-in-form" onSubmit={onsubmit}>
            <FormInput
              title="Email"
              required
              name="email"
              defaultValue="user@example.com"
              type="email"
              isLoading={isLoading}
            />
            <FormInput
              title="Password"
              name="password"
              required
              placeholder="****************"
              type="password"
              isLoading={isLoading}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" form="sign-in-form" type="submit"
            disabled={isLoading && true}>
            {
              isLoading
                ? <Spinner />
                : "Continue"
            }
          </Button>
        </CardFooter>
      </Card>
    </AuthForm>
  )
}

