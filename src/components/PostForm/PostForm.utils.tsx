import type React from "react";
import { mapValues, uniqueId } from "lodash";
import {
  type ControllerRenderProps,
  type RegisterOptions,
} from "react-hook-form";
import {
  Autocomplete,
  Box,
  Chip,
  TextField,
  Typography,
  type SxProps,
} from "@mui/material";

import { PostTypes } from "@/constants/postTypes";
import type { PostCreationType } from "@/interfaces/post";

import styles from "./PostForm.styles";

const defaultValues = {
  title: "",
  content: "",
  type: PostTypes.OTHER,
  hashtags: [],
  image: "",
};

export const getDefaultValues = (
  data: Partial<PostCreationType>,
): PostCreationType => ({
  ...defaultValues,
  ...data,
});

export const trimPayload = <T extends object>(obj: T): T =>
  mapValues(obj, (val) =>
    typeof val === "string"
      ? val.trim() || undefined
      : Array.isArray(val)
        ? val.flatMap((v) => (typeof v === "string" ? [v.trim()] : [v]))
        : val,
  ) as T;

export const FIELDS_PROPS: {
  name: keyof PostCreationType;
  label: string;
  fieldProps?: {
    rows?: number;
    multiline?: boolean;
    placeholder?: string;
    sx?: SxProps;
  };
  rules?: RegisterOptions<PostCreationType, keyof PostCreationType>;
  altField?: (field: ControllerRenderProps) => React.ReactElement;
}[] = [
    {
      name: "title",
      label: "Title",
      fieldProps: {
        placeholder: "Enter post title...",
      },
      rules: { required: "Title is required" },
    },
    {
      name: "content",
      label: "Description",
      fieldProps: {
        rows: 3,
        multiline: true,
        sx: styles.multiline,
        placeholder: "Provide details...",
      },
      rules: {
        required: "Description is required",
        minLength: {
          value: 8,
          message: "Description must be at least 8 characters",
        },
      },
    },
    {
      name: "hashtags",
      label: "Hashtags",
      rules: {},
      altField: (field: ControllerRenderProps) => (
        <Box>
          <Autocomplete
            sx={styles.hashtagsAutocomplete}
            multiple
            freeSolo
            options={[]}
            value={field.value ?? []}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderValue={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...props } = getTagProps({ index });

                return (
                  <Chip
                    key={key || uniqueId("hashtag-")}
                    size="small"
                    label={option}
                    {...props}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={field.value?.length ? "" : "Type and press Enter"}
              />
            )}
          />
          <Typography variant="caption">Press Enter to add a hashtag</Typography>
        </Box>
      ),
    },
  ];
