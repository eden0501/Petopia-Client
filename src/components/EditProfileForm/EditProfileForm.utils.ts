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
      max: {
        value: new Date().toISOString().split("T")[0],
        message: "Date cannot be in the future",
      },
    },
  },
];
