import {
  Box,
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { Close as CloseIcon, WarningAmberRounded } from "@mui/icons-material";

const DeleteAccountModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            padding: 20,
            borderRadius: 3,
            textAlign: "center",
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <WarningAmberRounded color="error" sx={{ fontSize: "3rem" }} />
      </Box>

      <DialogTitle sx={{ fontWeight: "600", fontSize: "1.3rem" }}>
        Are you absolutely sure?
      </DialogTitle>

      <DialogContentText sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogContentText>

      <DialogActions
        sx={{ flexDirection: "column", gap: 2, padding: 0, paddingTop: 20 }}
      >
        <Button
          onClick={onClose}
          fullWidth
          sx={{ fontWeight: "600", color: "text.primary" }}
        >
          No, keep my account
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          fullWidth
          sx={{ fontWeight: "600" }}
        >
          Yes, delete profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountModal;
