import { isEmpty } from "lodash";
import { toDate } from "date-fns";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { CameraAltOutlined } from "@mui/icons-material";
import { DesktopDatePicker as DatePicker } from "@mui/x-date-pickers";
import {
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Badge,
  FormHelperText,
} from "@mui/material";

import { resolveImageUrl } from "@/utils/imageUrl";
import { updateUser } from "@/services/users.service";
import { useUserContext } from "@/contexts/UserContext";
import type { UpdateUserData } from "@/interfaces/user";
import { ACCEPTED_IMAGE_TYPES } from "@/constants/imageTypes";

import styles from "./EditProfileForm.styles";
import { FIELDS_PROPS, getDefaultValues } from "./EditProfileForm.utils";

const EditProfileForm = () => {
  const {
    userData: { profilePicture, username, petsCount, petOwnerSince },
    updateUserData,
  } = useUserContext();

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    resolveImageUrl(profilePicture),
  );

  const handleImageSelect = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("image", {
          type: "manual",
          message: "Image must be less than 5MB",
        });
        setImageFile(undefined);
        setAvatarPreview(resolveImageUrl(profilePicture));
        return;
      }

      clearErrors("image");
      setImageFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm<UpdateUserData & { image?: string }>({
    defaultValues: getDefaultValues({
      username,
      petsCount,
      petOwnerSince,
    }),
  });

  const { mutate: saveChanges, isPending } = useMutation({
    mutationFn: (data: UpdateUserData) => updateUser(data, imageFile),
    onSuccess: (response, variables) => {
      updateUserData({
        ...variables,
        ...(response.profilePicture && {
          profilePicture: response.profilePicture,
        }),
      });
      navigate("/profile");
    },
  });

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.avatarSection}>
        <Box sx={styles.avatarWrapper}>
          <input
            type="file"
            accept={ACCEPTED_IMAGE_TYPES}
            hidden
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <Badge
            overlap="circular"
            slotProps={{
              badge: {
                sx: styles.cameraButton,
                onClick: () => fileInputRef.current?.click(),
              },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<CameraAltOutlined fontSize="small" />}
          >
            <Avatar sx={styles.avatar} src={avatarPreview} />
          </Badge>
        </Box>
        <Box>
          <Typography sx={styles.label}>Profile Picture</Typography>
          <Typography variant="caption" color="text.secondary">
            JPEG, PNG, GIF, and WebP images
          </Typography>
          {errors.image && (
            <FormHelperText error>
              {errors.image.message}
            </FormHelperText>
          )}
        </Box>
      </Box>
      {FIELDS_PROPS.map(({ name, label, type, rules, additionalProps }) => (
        <Box key={name}>
          <Typography sx={styles.label}>{label}</Typography>
          {type === "date" ? (
            <Controller
              name={name}
              rules={rules}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  maxDate={new Date()}
                  value={toDate(field.value ?? "")}
                  onChange={(date: Date | null) =>
                    field.onChange(date?.toISOString() ?? "")
                  }
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          ) : (
            <TextField
              type={type}
              {...register(name, rules)}
              {...additionalProps}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              fullWidth
            />
          )}
        </Box>
      ))}

      <Box sx={styles.actionsBox}>
        <Button variant="outlined" onClick={() => navigate("/profile")}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit((data) => saveChanges(data))}
          disabled={isPending || (!isDirty && !imageFile) || !isEmpty(errors)}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );
};

export default EditProfileForm;
