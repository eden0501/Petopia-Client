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
        <WarningAmberRounded color="primary" sx={{ fontSize: "3rem" }} />
      </Box>

      <DialogTitle sx={{ fontWeight: "600", fontSize: "1.3rem" }}>
        Logging out?
      </DialogTitle>

      <DialogContentText sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
        Are you sure you want to log out? You will need to enter your
        credentials again to access your Petopia account.
      </DialogContentText>

      <DialogActions sx={{ gap: 2, padding: 0, paddingTop: 20 }}>
        <Button
          onClick={onClose}
          fullWidth
          variant="outlined"
          sx={{ fontWeight: "600" }}
        >
          Yes, Log Me Out
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: "600" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
