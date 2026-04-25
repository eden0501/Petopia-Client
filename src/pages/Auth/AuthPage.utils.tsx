import type { TextField } from "@mui/material";
import type { RegisterOptions } from "react-hook-form";

import type { UserInterface } from "@/interfaces/user";

export type AuthFormType = Pick<UserInterface, "username"> & {
  password: string;
  petsCount?: string;
  petOwnerSince?: string;
};

export const defaultValues: AuthFormType = {
  username: "",
  password: "",
  petsCount: "0",
  petOwnerSince: new Date().toISOString().split("T")[0],
};

export const AUTH_TABS = {
  LOGIN: {
    tabContent: "Login",
    greeting: "Welcome Back",
    description: "Login to connect with the pet community",
    errorMessage: "Invalid username or password.",
    usernamePlaceholder: "Enter your username",
    passwordPlaceholder: "Enter your password",
  },
  SIGN_UP: {
    tabContent: "Sign Up",
    greeting: "Join Petopia",
    description: "Create an account to help pets in need",
    errorMessage: "Something went wrong. Please try again.",
    usernamePlaceholder: "Choose a username",
    passwordPlaceholder: "Choose a password",
  },
};

export type FieldProps = {
  name: keyof AuthFormType;
  label: string;
  type?: string;
  placeholder?: string;
  rules?: RegisterOptions<AuthFormType, keyof AuthFormType>;
  onlyFor?: keyof typeof AUTH_TABS;
  additionalProps?: React.ComponentProps<typeof TextField>;
};

export const FIELDS_PROPS: FieldProps[] = [
  {
    name: "username",
    label: "Username",
    rules: { required: "Username is required" },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        message: "Password must contain both letters and numbers",
      },
    },
  },
  {
    name: "petsCount",
    label: "Number of Pets",
    type: "number",
    placeholder: "1",
    onlyFor: "SIGN_UP",
    rules: {
      valueAsNumber: true,
      required: "Number of pets is required",
      min: {
        value: 0,
        message: "Number of pets cannot be negative",
      },
    },
    additionalProps: { inputProps: { min: 0 } },
  },
  {
    name: "petOwnerSince",
    label: "When did you become a pet owner?",
    onlyFor: "SIGN_UP",
    rules: {
      required: "Date is required",
      validate: (value) =>
        !value ||
        new Date(value as string) <= new Date() ||
        "Date must be today or before",
    },
  },
];
