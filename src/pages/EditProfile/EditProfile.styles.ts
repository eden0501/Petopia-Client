const styles = {
  container: {
    backgroundColor: "#FBF9FA",
    minHeight: "100vh",
  },

  innerContainer: {
    overflow: "auto",
    height: "calc(100vh - 110px)",
  },

  contentContainer: {
    width: { xs: "100%", sm: "60%" },
    minWidth: 300,
    padding: 10,
    paddingTop: 15,
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
