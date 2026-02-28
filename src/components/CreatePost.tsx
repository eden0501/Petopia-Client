import { useState } from "react";
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
import { Close as CloseIcon, BackupOutlined } from "@mui/icons-material";
import { CHIP_PROPS, PostTypes } from "../constants/postTypes";

const CreatePostModal = ({
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
      slotProps={{
        paper: {
          sx: {
            gap: 10,
            padding: 10,
            borderRadius: 3,
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "text.secondary",
          opacity: 0.7,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <DialogTitle sx={{ fontWeight: "600", fontSize: "1.3rem", pb: 1 }}>
          Create New Post
        </DialogTitle>
        <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
          Share rescue alerts, care tips, or equipment donations with the
          community
        </Typography>
      </Box>

      <ToggleButtonGroup
        value={postType}
        exclusive
        onChange={(_, val) => val && setPostType(val)}
      >
        {Object.values(CHIP_PROPS).map((chip) => (
          <ToggleButton key={chip.label} value={chip.label}>
            {chip.icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Chip
        color={CHIP_PROPS[postType].color}
        sx={{
          justifyContent: "flex-start",
          "& .MuiChip-label": { textWrap: "wrap" },
        }}
        label={CHIP_PROPS[postType].description}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: "600", mb: 1, fontSize: "0.8rem" }}>
            Title *
          </Typography>
          <TextField placeholder="Enter post title..." />
        </Box>

        <Box>
          <Typography sx={{ fontWeight: "600", mb: 1, fontSize: "0.8rem" }}>
            Description *
          </Typography>
          <TextField
            sx={{ "& .MuiOutlinedInput-root": { padding: 0 } }}
            multiline
            rows={3}
            placeholder="Provide details..."
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "600", mb: 1, fontSize: "0.8rem" }}>
            Hashtags (optional)
          </Typography>
          <TextField placeholder="rescue, urgent, help" />
          <Typography variant="caption" color="text.secondary">
            Separate hashtags with comas
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          py: 5,
          textAlign: "center",
          "&:hover": { backgroundColor: "grey.50" },
        }}
      >
        <BackupOutlined
          sx={{ color: "text.secondary", fontSize: "2rem", mb: 1 }}
        />
        <Typography sx={{ fontWeight: "600" }}>
          Click to upload photo
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
          PNG, JPG up to 10MB
        </Typography>
      </Box>

      <DialogActions sx={{ pt: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          fullWidth
          variant="outlined"
          sx={{ fontWeight: "600" }}
        >
          Cancel
        </Button>
        <Button fullWidth variant="contained" sx={{ fontWeight: "600" }}>
          Create Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostModal;
