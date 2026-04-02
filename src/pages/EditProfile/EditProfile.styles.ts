const styles = {
  container: {
    backgroundColor: "#FBF9FA",
    minHeight: "100vh",
  },

  innerContainer: {
    width: { xs: "100%", sm: "60%" },
    minWidth: 300,
  },

  contentContainer: {
    padding: 20,
    paddingTop: 30,
  },

  divider: {
    marginTop: 20,
    marginBottom: 10,
  },

  deleteSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dialogActions: {
    flexDirection: "column",
    gap: 2,
    padding: 0,
    paddingTop: 20,
  },

  keepButton: {
    fontWeight: "600",
    color: "text.primary",
  },

  deleteButton: {
    fontWeight: "600",
  },
};

export default styles;
