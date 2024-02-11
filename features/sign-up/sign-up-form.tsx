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
import FormInput from "@/components/auth/form-input";

export default function SignUpForm() {
  return (
    <AuthForm type="sign-up">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <FormInput
            title="Email"
            name="email"
            defaultValue="user@example.com"
            type="email"
          />
          <FormInput
            title="Password"
            name="password"
            placeholder="****************"
            type="password"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </Card>
    </AuthForm >
  )
}

