"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/CustomFormField";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  postalCode: z.string().min(5, { message: "Postal code is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  ssn: z.string().min(1, { message: "Social security number is required" }),
});

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Render different form based on type
  if (type === "sign-in") {
    return (
      <SignInForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        router={router}
      />
    );
  } else {
    return (
      <SignUpForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        router={router}
        setUser={setUser}
      />
    );
  }
};

const SignInForm = ({
  isLoading,
  setIsLoading,
  router,
}: {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: any;
}) => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSubmit(formData: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const user = await signIn({
        email: formData.email,
        password: formData.password,
      });
      if (user) {
        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            Sign In
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {" "}
          <CustomFormField
            form={form}
            name="email"
            label="Email"
            type="email"
            required={true}
          />
          <CustomFormField
            form={form}
            name="password"
            label="Password"
            type="password"
            required={true}
          />
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className="form-btn">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> &nbsp; Loading...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-16 font-normal text-gray-600">
          Don&apos;t have an account?
        </p>
        <Link href="/sign-up" className="form-link">
          Sign Up
        </Link>
      </footer>
    </section>
  );
};

const SignUpForm = ({
  isLoading,
  setIsLoading,
  setUser,
  router,
}: {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  router: any;
}) => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      setIsLoading(true);

      const signUpData: SignUpParams = {
        email: values.email,
        password: values.password,
        firstName: values.firstName!,
        lastName: values.lastName!,
        address1: values.address!,
        city: values.city!,
        state: values.state!,
        postalCode: values.postalCode!,
        dateOfBirth: values.dateOfBirth!,
        ssn: values.ssn!,
      };

      const newUser = await signUp(signUpData);
      setUser(newUser);
    } catch (error) {
      console.error("Sign-up error:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            Sign Up
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4">
            <CustomFormField
              form={form}
              name="firstName"
              label="First Name"
              required={true}
            />
            <CustomFormField
              form={form}
              name="lastName"
              label="Last Name"
              required={true}
            />
          </div>
          <CustomFormField
            form={form}
            name="address"
            label="Address"
            required={true}
          />
          <CustomFormField
            form={form}
            name="city"
            label="City"
            required={true}
          />
          <div className="flex gap-4">
            <CustomFormField
              form={form}
              name="state"
              label="State"
              required={true}
            />
            <CustomFormField
              form={form}
              name="postalCode"
              label="Zip Code"
              required={true}
            />
          </div>
          <div className="flex gap-4">
            <CustomFormField
              form={form}
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              required={true}
            />
            <CustomFormField
              form={form}
              name="ssn"
              label="SSN"
              required={true}
            />
          </div>
          <CustomFormField
            form={form}
            name="email"
            label="Email"
            type="email"
            required={true}
          />
          <CustomFormField
            form={form}
            name="password"
            label="Password"
            type="password"
            required={true}
          />
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className="form-btn">
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> &nbsp; Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-16 font-normal text-gray-600">
          Already have an account?
        </p>
        <Link href="/sign-in" className="form-link">
          Sign In
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;
