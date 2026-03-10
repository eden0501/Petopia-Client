import { Close as CloseIcon, WarningAmberRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import styles from "./LogoutModal.styles";

const LogoutModal = ({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <IconButton onClick={onCancel} sx={styles.closeButton}>
        <CloseIcon />
      </IconButton>

      <Box sx={styles.iconBox}>
        <WarningAmberRounded color="primary" sx={styles.warningIcon} />
      </Box>

      <DialogTitle sx={styles.dialogTitle}>Logging out?</DialogTitle>

      <DialogContentText sx={styles.dialogContent}>
        Are you sure you want to log out? You will need to enter your
        credentials again to access your Petopia account.
      </DialogContentText>

      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={onConfirm}
          fullWidth
          variant="outlined"
          sx={styles.buttonText}
        >
          Yes, Log Me Out
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          color="primary"
          fullWidth
          sx={styles.buttonText}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
