import { Close as CloseIcon, WarningAmberRounded } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

import styles from "./ConfirmationModal.styles";

const ConfirmationModal = ({
  open,
  onClose,
  title,
  content,
  actions,
  variant = "primary",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  variant?: "error" | "primary";
  actions?: React.ReactNode;
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    slotProps={{ paper: { sx: styles.paper } }}
  >
    <IconButton onClick={onClose} sx={styles.closeButton}>
      <CloseIcon />
    </IconButton>

    <Box sx={styles.iconBox}>
      <WarningAmberRounded color={variant} sx={styles.warningIcon} />
    </Box>

    <DialogTitle sx={styles.dialogTitle}>{title}</DialogTitle>

    <DialogContentText sx={styles.dialogContent}>{content}</DialogContentText>

    {actions}
  </Dialog>
);

export default ConfirmationModal;
