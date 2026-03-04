import styles from "./DeleteProfileModal.styles";
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

const DeleteProfileModal = ({
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
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <IconButton onClick={onClose} sx={styles.closeButton}>
        <CloseIcon />
      </IconButton>

      <Box sx={styles.iconBox}>
        <WarningAmberRounded color="error" sx={styles.warningIcon} />
      </Box>

      <DialogTitle sx={styles.dialogTitle}>Are you absolutely sure?</DialogTitle>

      <DialogContentText sx={styles.dialogContent}>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogContentText>

      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClose} fullWidth sx={styles.keepButton}>
          No, keep my account
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          fullWidth
          sx={styles.deleteButton}
        >
          Yes, delete account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProfileModal;
