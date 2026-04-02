const styles = {
  paper: {
    gap: 10,
    padding: 10,
    borderRadius: 2,
  },

  closeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    color: "text.secondary",
    opacity: 0.7,
  },

  headerBox: {
    textAlign: "center",
    marginBottom: 2,
  },

  dialogTitle: {
    fontWeight: "600",
    fontSize: "1.3rem",
    pb: 1,
  },

  subtitle: {
    px: 2,
    color: "text.secondary",
  },

  chip: {
    justifyContent: "flex-start",
    "& .MuiChip-label": { textWrap: "wrap" },
  },

  formBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  label: {
    mb: 1,
  },
  hashtagsAutocomplete: {
    ".MuiAutocomplete-inputRoot": {
      padding: 4,
    },
  },

  multiline: {
    "& .MuiOutlinedInput-root": {
      padding: 0,
    },
  },

  uploadBox: {
    border: "1px dashed",
    borderColor: "divider",
    borderRadius: 3,
    py: 5,
    textAlign: "center",
    "&:hover": {
      backgroundColor: "grey.50",
    },
  },

  uploadIcon: {
    color: "text.secondary",
    fontSize: "2rem",
    mb: 1,
  },

  dialogActions: {
    pt: 3,
    gap: 1,
  },

  buttonText: {
    fontWeight: 600,
  },
};

export default styles;
