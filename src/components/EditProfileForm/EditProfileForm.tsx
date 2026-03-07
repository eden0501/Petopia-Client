import { isEmpty } from "lodash";
import { toDate } from "date-fns";
import { useNavigate } from "react-router";
import { DatePicker } from "@mui/x-date-pickers";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { CameraAltOutlined } from "@mui/icons-material";
import {
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Badge,
} from "@mui/material";

import { updateUser } from "@/services/users.service";
import { useUserContext } from "@/contexts/UserContext";
import { getDateStringWithoutTime } from "@/utils/dateUtils";
import type { UpdateUserData } from "@/interfaces/user";

import styles from "./EditProfileForm.styles";
import { FIELDS_PROPS, getDefaultValues } from "./EditProfileForm.utils";

const EditProfileForm = () => {
  const {
    userData: { profilePicture, username, petsCount, petOwnerSince },
    updateUserData,
  } = useUserContext();

  const navigate = useNavigate();
  const today = getDateStringWithoutTime();

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<UpdateUserData>({
    defaultValues: getDefaultValues({
      username,
      petsCount,
      petOwnerSince,
    }),
  });

  const { mutate: saveChanges, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      updateUserData(variables);
      navigate("/profile");
    },
  });

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.avatarSection}>
        <Box sx={styles.avatarWrapper}>
          <Badge
            overlap="circular"
            slotProps={{
              badge: {
                sx: styles.cameraButton,
                onClick: () => console.log("implement image upload"),
              },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<CameraAltOutlined fontSize="small" />}
          >
            <Avatar sx={styles.avatar} src={profilePicture} />
          </Badge>
        </Box>
        <Box>
          <Typography sx={styles.label}>Profile Picture</Typography>
          <Typography variant="caption" color="text.secondary">
            JPG, PNG or GIF, Max size 2MB
          </Typography>
        </Box>
      </Box>
      {FIELDS_PROPS.map(({ name, label, type, rules }) => (
        <Box key={name}>
          <Typography sx={styles.label}>{label}</Typography>
          {type === "date" ? (
            <Controller
              name={name}
              rules={rules}
              control={control}
              render={({ field }) => (
                <DatePicker {...field} value={toDate(field.value ?? "")} />
              )}
            />
          ) : (
            <TextField
              type={type}
              {...register(name, rules)}
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
          disabled={isPending || !isDirty || !isEmpty(errors)}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );
};

export default EditProfileForm;
