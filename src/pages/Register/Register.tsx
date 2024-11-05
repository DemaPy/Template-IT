"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Auth } from "@/services/Auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

type FormValues = {
  email: string;
  submit_email: string;
  password: string;
};

const options = {
  defaultValues: {
    email: "",
    submit_email: "",
    password: "",
  },
};

function Register() {
  const navigate = useNavigate();

  const {
    formState: { errors },
    setError,
    register,
    handleSubmit,
  } = useForm<FormValues>(options);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: Auth.registration,
    onSuccess: () => {
      toast.success("Success. You will be redirected in 2 seconds...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  return (
    <div className="flex items-center justify-center mx-10 h-full">
      <Card className="min-w-96 max-w-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Register new account</CardTitle>
          <CardDescription>
            Enter your email and password below to register new account
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(({ email, submit_email, password }) => {
            if (email !== submit_email) {
              setError(
                "submit_email",
                { message: "Emails should be the same" },
                {
                  shouldFocus: true,
                }
              );
              setError("email", { message: "Emails should be the same" });
              return;
            }
            mutate({ email, password });
          })}
        >
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Enter email",
                  minLength: {
                    value: 8,
                    message: "Email too short.",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                id="email"
                type="email"
                placeholder="mail@example.com"
              />
              {"email" in errors && (
                <p className="text-sm font-semibold text-red-300">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="submit_email">Submit Email</Label>
              <Input
                {...register("submit_email", {
                  required: "Enter email",
                  minLength: {
                    value: 10,
                    message: "Email too short.",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                id="submit_email"
                type="email"
                placeholder="mail@example.com"
              />
              {"email" in errors && (
                <p className="text-sm font-semibold text-red-300">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: "Enter password",
                  minLength: {
                    value: 4,
                    message: "Password too short.",
                  },
                })}
                id="password"
                type="password"
              />
              {"password" in errors && (
                <p className="text-sm font-semibold text-red-300">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button
              disabled={isPending || isSuccess}
              className="w-full"
              type="submit"
            >
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}

export default Register;
