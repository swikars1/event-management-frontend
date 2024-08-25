"use client";
import { Card, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { useToast } from "./ui/use-toast";

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function RegisterForm() {
  const { push } = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>();

  const { mutate, isPending } = useMutation({
    mutationFn: userService.register,
    mutationKey: ["registerMutation"],
    onSuccess: (res) => {
      push("/signin");
      toast({
        title: "Success",
        description: "Successfully registered. Please login.",
        variant: "default",
      });
      // setToken(res?.responseObject?.bearerToken || "");
    },
  });
  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    mutate({
      name: `${data.firstName} ${data.lastName}`,
      password: data.password,
      email: data.email,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                required
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-red-400 text-sm">
                  First Name is required.
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                required
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="text-red-400 text-sm">
                  Last Name is required.
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400 text-sm">Email is required.</span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-400 text-sm">
                Password is required.
              </span>
            )}
          </div>
          <Button type="submit" className="w-full">
            {!isPending ? "Register" : "Please Wait..."}
          </Button>
        </form>
        <p className="text-center">Already have an account?</p>
        <CardDescription>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => push("/signin")}
          >
            Login
          </Button>
        </CardDescription>
      </Card>
    </div>
  );
}
