import type { RegisterOptions } from "react-hook-form";

import type { UpdateUserData } from "@/interfaces/user";

const defaultValues = {
  username: "",
  petsCount: 0,
  petOwnerSince: "",
};

export const getDefaultValues = (
  data: Partial<UpdateUserData>,
): UpdateUserData => ({
  ...defaultValues,
  ...data,
});

export const FIELDS_PROPS: {
  name: keyof UpdateUserData;
  label: string;
  type: React.HTMLInputTypeAttribute;
  rules: RegisterOptions<UpdateUserData, keyof UpdateUserData>;
}[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    rules: {
      required: "Username is required",
    },
  },
  {
    name: "petsCount",
    label: "Number of Pets",
    type: "number",
    rules: {
      valueAsNumber: true,
    },
  },
  {
    name: "petOwnerSince",
    label: "Pet Owner Since",
    type: "date",
    rules: {
      validate: (value) =>
        !value ||
        new Date(value as string) <= new Date() ||
        "Date must be today or before",
    },
  },
];
