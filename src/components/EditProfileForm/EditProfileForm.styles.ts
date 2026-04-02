const styles = {
  container: {
    paddingTop: 30,
    gap: 20,
  },

  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 80,
    height: 80,
  },

  cameraButton: {
    width: 30,
    height: 30,
    color: "white",
    borderRadius: "50%",
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.main",
    },
  },

  label: {
    mb: 0.5,
    fontWeight: "600",
  },

  actionsBox: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
};

export default styles;
