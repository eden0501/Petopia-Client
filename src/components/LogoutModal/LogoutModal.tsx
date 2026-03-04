import styles from "./LogoutModal.styles";
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

const LogoutModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
        <WarningAmberRounded color="primary" sx={styles.warningIcon} />
      </Box>

      <DialogTitle sx={styles.dialogTitle}>Logging out?</DialogTitle>

      <DialogContentText sx={styles.dialogContent}>
        Are you sure you want to log out? You will need to enter your
        credentials again to access your Petopia account.
      </DialogContentText>

      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={onClose}
          fullWidth
          variant="outlined"
          sx={styles.buttonText}
        >
          Yes, Log Me Out
        </Button>
        <Button
          onClick={onClose}
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
