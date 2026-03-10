import { useState } from "react";
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
} from "@mui/material";

import { CHIP_PROPS, PostTypes } from "@/constants/postTypes";

import styles from "./PostForm.styles";

const PostForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [postType, setPostType] = useState<PostTypes>(PostTypes.OTHER);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <IconButton onClick={onClose} sx={styles.closeButton}>
        <CloseIcon />
      </IconButton>

      <Box sx={styles.headerBox}>
        <DialogTitle sx={styles.dialogTitle}>Create New Post</DialogTitle>
        <Typography variant="subtitle1" sx={styles.subtitle}>
          Share rescue alerts, care tips, or equipment donations with the
          community
        </Typography>
      </Box>

      <ToggleButtonGroup
        value={postType}
        exclusive
        onChange={(_, val) => val && setPostType(val)}
      >
        {Object.entries(CHIP_PROPS).map(([type, { icon }]) => (
          <ToggleButton key={type} value={type}>
            {icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Chip
        color={CHIP_PROPS[postType].color}
        sx={styles.chip}
        label={CHIP_PROPS[postType].description}
      />

      <Box sx={styles.formBox}>
        <Box>
          <Typography variant="overline" sx={styles.label}>Title *</Typography>
          <TextField placeholder="Enter post title..." />
        </Box>

        <Box>
          <Typography variant="overline" sx={styles.label}>Description *</Typography>
          <TextField
            sx={styles.multiline}
            multiline
            rows={3}
            placeholder="Provide details..."
          />
        </Box>
        <Box>
          <Typography variant="overline" sx={styles.label}>Hashtags (optional)</Typography>
          <TextField placeholder="rescue, urgent, help" />
          <Typography variant="caption">
            Separate hashtags with commas
          </Typography>
        </Box>
      </Box>
      <Box
        sx={styles.uploadBox}
        onClick={() => console.log("Image upload coming soon!")}
      >
        <BackupOutlined sx={styles.uploadIcon} />
        <Typography variant="subtitle2">Click to upload photo</Typography>
        <Typography variant="caption">PNG, JPG up to 10MB</Typography>
      </Box>

      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={onClose}
          fullWidth
          variant="outlined"
          sx={styles.buttonText}
        >
          Cancel
        </Button>
        <Button fullWidth variant="contained" sx={styles.buttonText}>
          Create Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
