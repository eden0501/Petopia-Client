import { isEmpty } from "lodash";
import { Controller, useForm, useWatch } from "react-hook-form";
import { createElement, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BackupOutlined, Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogActions,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Chip,
  FormHelperText,
} from "@mui/material";

import { CHIP_PROPS } from "@/constants/postTypes";
import { resolveImageUrl } from "@/utils/imageUrl";
import { useUserContext } from "@/contexts/UserContext";
import { ACCEPTED_IMAGE_TYPES } from "@/constants/imageTypes";
import { createPost, updatePost } from "@/services/posts.service";
import type { PostCreationType, PostInterface } from "@/interfaces/post";

import styles from "./PostForm.styles";
import { FIELDS_PROPS, getDefaultValues, trimPayload } from "./PostForm.utils";

const PostForm = ({
  open,
  onClose,
  post,
}: {
  open: boolean;
  onClose: () => void;
  post?: PostInterface;
}) => {
  const queryClient = useQueryClient();
  const { changePostCount } = useUserContext();

  const isEditMode = useMemo(() => !!post, [post]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    resolveImageUrl(post?.imageUrl),
  );

  const {
    reset,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PostCreationType & { image?: string }>({
    defaultValues: getDefaultValues(post ?? {}),
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: (data: PostCreationType) =>
      isEditMode && post
        ? updatePost(post._id, trimPayload(data), imageFile)
        : createPost(trimPayload(data), imageFile),
    onSuccess: () => {
      !isEditMode && changePostCount(true);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-post"] });

      handleClose();
    },
  });

  const onSubmit = (data: PostCreationType) => {
    submitPost(data);
  };

  const handleClose = () => {
    reset();
    clearErrors("image");
    setImageFile(undefined);
    setImagePreview(resolveImageUrl(post?.imageUrl));
    onClose();
  };

  const handleImageSelect = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        clearErrors("image");
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        setError("image", {
          type: "manual",
          message: "Image must be less than 10MB",
        });
        setImageFile(undefined);
        setImagePreview(resolveImageUrl(post?.imageUrl));
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <IconButton onClick={handleClose} sx={styles.closeButton}>
        <CloseIcon />
      </IconButton>

      <Box sx={styles.headerBox}>
        <DialogTitle sx={styles.dialogTitle}>
          {isEditMode ? "Edit Post" : "Create New Post"}
        </DialogTitle>
        <Typography sx={styles.subtitle}>
          {isEditMode
            ? "Update your post details"
            : "Share rescue alerts, care tips, or equipment donations with the community"}
        </Typography>
      </Box>

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <ToggleButtonGroup
            value={field.value}
            exclusive
            onChange={(_, val) => val && field.onChange(val)}
          >
            {Object.entries(CHIP_PROPS).map(([type, { icon }]) => (
              <ToggleButton key={type} value={type}>
                {icon}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />

      <Chip
        color={CHIP_PROPS[selectedType].color}
        sx={styles.chip}
        label={CHIP_PROPS[selectedType].description}
      />

      <Box sx={styles.formBox}>
        {FIELDS_PROPS.map(({ name, label, rules, fieldProps, altField }) => (
          <Box key={name}>
            <Typography variant="overline" sx={styles.label}>
              {label}{" "}
              <Typography component="span" color="error">
                {rules?.required && "*"}
              </Typography>
            </Typography>
            <Controller
              name={name}
              control={control}
              rules={rules}
              render={({ field, fieldState: { error } }) =>
                altField ? (
                  createElement(altField, { ...field })
                ) : (
                  <TextField
                    fullWidth
                    {...fieldProps}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )
              }
            />
          </Box>
        ))}
      </Box>
      <input
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        hidden
        ref={fileInputRef}
        onChange={handleImageSelect}
      />
      <Box sx={styles.uploadBox} onClick={() => fileInputRef.current?.click()}>
        {imagePreview ? (
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={styles.imagePreview}
          />
        ) : (
          <>
            <BackupOutlined sx={styles.uploadIcon} />
            <Typography variant="subtitle2">Click to upload photo</Typography>
            <Typography variant="caption">
              Only JPEG, PNG, GIF, and WebP images
            </Typography>
          </>
        )}
      </Box>
      {errors.image && (
        <FormHelperText error sx={{ mx: 14 }}>
          {errors.image.message}
        </FormHelperText>
      )}

      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={handleClose}
          fullWidth
          variant="outlined"
          sx={styles.buttonText}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={styles.buttonText}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending || !isEmpty(errors)}
        >
          {isEditMode ? "Update Post" : "Create Post"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
